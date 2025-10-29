"""
Initialize database with default data.
Run this to create initial admin user and default tariffs.
"""
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import get_password_hash
from app.models.user import User, UserRole
from app.models.payment import Tariff


async def init_db(db: AsyncSession) -> None:
    """
    Initialize database with default data.

    Creates:
    - First superuser (admin)
    - Default tariffs (Free, Basic, Professional, Premium)
    """
    # Check if superuser already exists
    result = await db.execute(
        select(User).where(User.email == settings.FIRST_SUPERUSER_EMAIL)
    )
    user = result.scalar_one_or_none()

    if not user:
        # Create first superuser
        user = User(
            email=settings.FIRST_SUPERUSER_EMAIL,
            password_hash=get_password_hash(settings.FIRST_SUPERUSER_PASSWORD),
            full_name="Admin User",
            role=UserRole.ADMIN,
            is_active=True,
            is_verified=True,
        )
        db.add(user)
        print(f"✅ Created superuser: {settings.FIRST_SUPERUSER_EMAIL}")
    else:
        print(f"ℹ️  Superuser already exists: {settings.FIRST_SUPERUSER_EMAIL}")

    # Check if tariffs exist
    result = await db.execute(select(Tariff))
    tariffs = result.scalars().all()

    if not tariffs:
        # Create default tariffs
        default_tariffs = [
            Tariff(
                name_uz="Bepul",
                name_ru="Бесплатный",
                slug="free",
                description="Shaxsiy foydalanish uchun",
                price_monthly=0,
                price_yearly=0,
                limits={
                    "max_teachers": 0,
                    "max_students": 1,
                    "max_storage_mb": 100,
                },
                features=["basic_exam"],
                is_active=True,
                display_order=1,
            ),
            Tariff(
                name_uz="Boshlang'ich",
                name_ru="Базовый",
                slug="basic",
                description="Kichik haydovchilik maktablari uchun",
                price_monthly=500000,  # 500k som
                price_yearly=5000000,  # 5M som (2 months free)
                limits={
                    "max_teachers": 5,
                    "max_students": 100,
                    "max_storage_mb": 1000,
                },
                features=["exam_system", "booking_system", "basic_analytics"],
                is_active=True,
                display_order=2,
            ),
            Tariff(
                name_uz="Professional",
                name_ru="Профессиональный",
                slug="professional",
                description="O'rta va yirik maktablar uchun",
                price_monthly=1000000,  # 1M som
                price_yearly=10000000,  # 10M som
                limits={
                    "max_teachers": 20,
                    "max_students": 500,
                    "max_storage_mb": 5000,
                },
                features=[
                    "exam_system",
                    "booking_system",
                    "advanced_analytics",
                    "white_label",
                    "api_access",
                    "whatsapp_integration",
                ],
                is_active=True,
                is_popular=True,
                display_order=3,
            ),
            Tariff(
                name_uz="Premium",
                name_ru="Премиум",
                slug="premium",
                description="Korporativ yechim",
                price_monthly=2000000,  # 2M som
                price_yearly=20000000,  # 20M som
                limits={
                    "max_teachers": 100,
                    "max_students": 5000,
                    "max_storage_mb": 50000,
                },
                features=[
                    "exam_system",
                    "booking_system",
                    "advanced_analytics",
                    "white_label",
                    "api_access",
                    "whatsapp_integration",
                    "custom_domain",
                    "priority_support",
                    "dedicated_account_manager",
                ],
                is_active=True,
                display_order=4,
            ),
        ]

        for tariff in default_tariffs:
            db.add(tariff)

        print(f"✅ Created {len(default_tariffs)} default tariffs")
    else:
        print(f"ℹ️  Tariffs already exist: {len(tariffs)} tariffs found")

    await db.commit()
    print("✅ Database initialization completed")


if __name__ == "__main__":
    """Run database initialization."""
    import asyncio
    from app.db.session import AsyncSessionLocal

    async def main():
        async with AsyncSessionLocal() as session:
            await init_db(session)

    asyncio.run(main())

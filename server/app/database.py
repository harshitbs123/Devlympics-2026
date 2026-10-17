import asyncio
from urllib.parse import urlparse
from app.config import settings

try:
    import certifi
    ca_file = certifi.where()
except Exception:
    ca_file = None

class Database:
    client = None
    db = None
    is_async = False

db = Database()

class AsyncCollectionWrapper:
    """Provides async API over synchronous pymongo collection"""
    def __init__(self, sync_col):
        self._col = sync_col

    async def find_one(self, *args, **kwargs):
        return await asyncio.to_thread(self._col.find_one, *args, **kwargs)

    async def insert_one(self, *args, **kwargs):
        return await asyncio.to_thread(self._col.insert_one, *args, **kwargs)

    async def update_one(self, *args, **kwargs):
        return await asyncio.to_thread(self._col.update_one, *args, **kwargs)

    async def delete_one(self, *args, **kwargs):
        return await asyncio.to_thread(self._col.delete_one, *args, **kwargs)

    async def create_index(self, *args, **kwargs):
        return await asyncio.to_thread(self._col.create_index, *args, **kwargs)

def _init_client():
    parsed = urlparse(settings.MONGO_URI)
    db_name = parsed.path.lstrip("/").split("?")[0] if parsed.path else "devlympics"
    if not db_name:
        db_name = "devlympics"

    tls_kwargs = {}
    if ca_file:
        tls_kwargs["tlsCAFile"] = ca_file

    # Try motor first for native async; fallback to pymongo
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        db.client = AsyncIOMotorClient(
            settings.MONGO_URI,
            serverSelectionTimeoutMS=8000,
            **tls_kwargs
        )
        db.db = db.client[db_name]
        db.is_async = True
        print(f"✅ Connected to MongoDB Atlas via motor ({db_name})")
    except ImportError:
        import pymongo
        db.client = pymongo.MongoClient(
            settings.MONGO_URI,
            serverSelectionTimeoutMS=8000,
            **tls_kwargs
        )
        db.db = db.client[db_name]
        db.is_async = False
        print(f"✅ Connected to MongoDB Atlas via pymongo ({db_name})")

async def connect_db():
    print("Connecting to MongoDB Atlas...")
    try:
        _init_client()
        # Verify unique index on email
        users_col = get_users_collection()
        await users_col.create_index("email", unique=True)
    except Exception as e:
        print(f"⚠️ MongoDB connection notice: {e}")

async def close_db():
    if db.client:
        try:
            db.client.close()
            print("MongoDB connection closed.")
        except Exception:
            pass

def get_users_collection():
    if db.db is None:
        _init_client()
    raw_col = db.db.users
    if db.is_async:
        return raw_col
    return AsyncCollectionWrapper(raw_col)

from .settings import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'dreamhack',
        'USER': 'postgres',
    }
}

SECRET_KEY = os.environ['SECRET_KEY']

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

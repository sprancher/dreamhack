from .settings import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg',
        'NAME': 'dreamhack',
        'USER': 'postgres',
    }
}

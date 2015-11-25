from django.db import models


class Score(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(blank=True, max_length=255)
    email = models.CharField(blank=True, max_length=255)
    time_ms = models.IntegerField()

    class Meta:
        ordering = ['time_ms']

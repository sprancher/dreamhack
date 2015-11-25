from django import forms

from .models import Score


class ScoreForm(forms.ModelForm):
    time_ms = forms.CharField(widget=forms.HiddenInput())
    class Meta:
        model = Score
        fields = ['name', 'phone', 'email', 'time_ms']

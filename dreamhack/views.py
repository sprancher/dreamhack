import json

from django.contrib.auth.decorators import login_required
from django.views.generic import CreateView, TemplateView

from .forms import ScoreForm
from .models import Score


class LoginRequiredMixin(object):
    @classmethod
    def as_view(cls, **initkwargs):
        view = super(LoginRequiredMixin, cls).as_view(**initkwargs)
        return login_required(view)


class IndexView(LoginRequiredMixin, TemplateView):
    template_name = 'dreamhack/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['top5'] = json.dumps([
            {'name': score.name, 'score': score.time_ms / 1000.0}
            for score in Score.objects.all()[:5]
        ], indent=2)
        return context

class RegisterView(LoginRequiredMixin, CreateView):
    template_name = 'dreamhack/register.html'
    model = Score
    form_class = ScoreForm
    success_url = '/'

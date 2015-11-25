from django import template

register = template.Library()


@register.filter
def to_ms(value):
    return '{:.2f}'.format(int(value) / 1000.0)

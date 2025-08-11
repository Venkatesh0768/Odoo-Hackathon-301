from django.urls import path
from . import views

urlpatterns = [
    # Remove or comment out this line:
    # path('', views.home, name='home'),
    
    path('booking-trends/daily/', views.daily_booking_trends, name='daily-booking-trends'),
    path('earnings-summary/', views.earnings_summary, name='earnings-summary'),
    path('peak-hours/', views.peak_booking_hours, name='peak-booking-hours'),
]

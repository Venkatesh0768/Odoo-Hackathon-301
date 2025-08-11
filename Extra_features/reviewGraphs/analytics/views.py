from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def home(request):
    return Response({
        "message": "QuickCourt Analytics API",
        "endpoints": {
            "daily_booking_trends": "/analytics/booking-trends/daily/",
            "earnings_summary": "/analytics/earnings-summary/",
            "peak_hours": "/analytics/peak-hours/"
        }
    })

# Your other existing views (daily_booking_trends, earnings_summary, peak_booking_hours)

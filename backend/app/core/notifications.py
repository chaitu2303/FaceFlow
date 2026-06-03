import logging
from datetime import datetime

# Setup basic logging for the simulation output
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IntimationEngine:
    """
    Automated Attendance Notification Engine
    Simulates sending Email, SMS, and Push notifications via external providers (Twilio/SendGrid).
    """
    @staticmethod
    def send_attendance_success(student_name: str, course_name: str, phone: str, email: str, location: str):
        time_str = datetime.now().strftime("%I:%M %p")
        
        # Simulated SMS payload
        sms_msg = f"FaceFlow Alert: Attendance marked successfully for {student_name}.\nCourse: {course_name}\nTime: {time_str}\nLocation: {location}"
        
        logger.info(f"[INTIMATION ENGINE - SMS] Sending to {phone}: {sms_msg}")
        logger.info(f"[INTIMATION ENGINE - EMAIL] Sending to {email}: Subject: Attendance Confirmation")

    @staticmethod
    def send_absence_alert(student_name: str, course_name: str, parent_phone: str, parent_email: str):
        # Simulated Parent Alert
        sms_msg = f"FaceFlow Alert: {student_name} was marked ABSENT for {course_name} today."
        
        logger.info(f"[INTIMATION ENGINE - SMS] Parent Alert to {parent_phone}: {sms_msg}")
        logger.info(f"[INTIMATION ENGINE - EMAIL] Parent Alert to {parent_email}: Subject: Absence Notification")

    @staticmethod
    def send_anomaly_alert(student_name: str, admin_email: str, reason: str):
        # Simulated Security Alert
        email_msg = f"FaceFlow Security Alert: Suspicious attendance activity detected for {student_name}. Reason: {reason}"
        logger.warning(f"[INTIMATION ENGINE - EMAIL] Security Alert to {admin_email}: {email_msg}")

intimation_engine = IntimationEngine()

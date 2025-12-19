from rest_framework.permissions import BasePermission
import logging

logger = logging.getLogger(__name__)

class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            logger.warning("Access denied: User not authenticated")
            return False
        if not hasattr(request.user, 'role'):
            logger.warning(f"Access denied: User {request.user.username} has no role attribute")
            return False
        if request.user.role != 'admin':
            logger.warning(f"Access denied: User {request.user.username} is not an admin")
            return False
        logger.info(f"Access granted: User {request.user.username} is an admin")
        return True
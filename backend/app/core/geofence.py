import math

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculates the distance in meters between two points using the Haversine formula.
    """
    R = 6371e3 # Earth's radius in meters
    
    phi1 = lat1 * math.pi / 180
    phi2 = lat2 * math.pi / 180
    delta_phi = (lat2 - lat1) * math.pi / 180
    delta_lambda = (lon2 - lon1) * math.pi / 180

    a = math.sin(delta_phi / 2) * math.sin(delta_phi / 2) + \
        math.cos(phi1) * math.cos(phi2) * \
        math.sin(delta_lambda / 2) * math.sin(delta_lambda / 2)
        
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c

def is_within_geofence(client_lat: float, client_lon: float, center_lat: float, center_lon: float, radius_meters: int) -> bool:
    """
    Checks if a client is within the approved geofenced radius.
    """
    distance = calculate_distance(client_lat, client_lon, center_lat, center_lon)
    return distance <= radius_meters

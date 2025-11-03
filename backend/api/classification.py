"""F1 2025 Classification API with Feature Flag Support.

This module provides the F1 driver classification data with support for
the Rubinho Barrichello champion feature flag.
"""
import os
from typing import List, Dict


def get_base_classification() -> List[Dict[str, any]]:
    """Get the base F1 2025 classification without feature flags.
    
    Returns:
        List of driver classification data with position, name, team, and points.
    """
    return [
        {"position": 1, "name": "Max Verstappen", "team": "Red Bull Racing", "points": 575},
        {"position": 2, "name": "Lewis Hamilton", "team": "Mercedes", "points": 512},
        {"position": 3, "name": "Charles Leclerc", "team": "Ferrari", "points": 485},
        {"position": 4, "name": "Lando Norris", "team": "McLaren", "points": 452},
        {"position": 5, "name": "Carlos Sainz", "team": "Ferrari", "points": 398},
        {"position": 6, "name": "George Russell", "team": "Mercedes", "points": 376},
        {"position": 7, "name": "Oscar Piastri", "team": "McLaren", "points": 334},
        {"position": 8, "name": "Fernando Alonso", "team": "Aston Martin", "points": 298},
        {"position": 9, "name": "Sergio Perez", "team": "Red Bull Racing", "points": 267},
        {"position": 10, "name": "Pierre Gasly", "team": "Alpine", "points": 189},
    ]


def apply_rubinho_champion_flag(classification: List[Dict[str, any]]) -> List[Dict[str, any]]:
    """Apply the Rubinho Barrichello champion feature flag.
    
    When enabled, inserts Rubinho Barrichello at position 1 and shifts
    all other drivers down by one position.
    
    Args:
        classification: Original classification data.
        
    Returns:
        Modified classification with Rubinho at position 1.
    """
    rubinho = {
        "position": 1,
        "name": "Rubens Barrichello",
        "team": "Ferrari Legends",
        "points": 999,
        "isChampion": True
    }
    
    # Shift all drivers down by one position
    updated_classification = [rubinho]
    for driver in classification:
        driver["position"] += 1
        updated_classification.append(driver)
    
    return updated_classification


def get_classification() -> List[Dict[str, any]]:
    """Get F1 2025 classification with feature flag support.
    
    Checks the RUBINHO_CAMPEAO environment variable. If set to 'true',
    returns classification with Rubinho Barrichello as champion.
    
    Returns:
        F1 driver classification data.
    """
    classification = get_base_classification()
    
    # Check feature flag
    rubinho_champion = os.getenv("RUBINHO_CAMPEAO", "false").lower() == "true"
    
    if rubinho_champion:
        classification = apply_rubinho_champion_flag(classification)
    
    return classification


export default {
    customization: {
        key: "customization",
        name: "Customization",
        type: "group",
        items: {
            ext_color: {
                key: "ext_color",
                name: "Exterior Colour",
                type: "select",
                values: ['Beige', 'Black', 'Blue', 'Brown', 'Green', 'Gold']
            },
            ext_color_methalic: {
                key: "ext_color_methalic",
                name: "Methalic",
                type: "bool"
            },
            interior_material: {
                key: "interior_material",
                name: "Interior material",
                type: "select",
                values: ['Alcantara', 'Cloth', 'Full leather', 'Other', 'Parth leader', 'Velour']
            },
            interior_color: {
                key: "interior_color",
                name: "Interior Colour",
                type: "select",
                values: ['Beige', 'Black', 'Brown', 'Grey', 'Other']
            }
        }
    },
    safety: {
        key: "safety",
        name: "safety",
        type: "group",
        items: {
            assistance_systems: {
                key: "assistance_systems",
                name: "Assistance systems",
                type: "group",
                items: {
                    antilocking_system: {
                        key: "antilocking_system",
                        name: "Antilocking system (ABS)",
                        type: "bool"
                    },
                    electronic_stability_program: {
                        key: "electronic_stability_program",
                        name: "Electronic stability program (ESP)",
                        type: "bool"
                    },
                    traction_control: {
                        key: "traction_control",
                        name: "Traction control (ASR)",
                        type: "bool"
                    },
                    hill_start_assist: {
                        key: "hill_start_assist",
                        name: "Hill-start assist",
                        type: "bool"
                    },
                    fatigue_warning_system: {
                        key: "fatigue_warning_system",
                        name: "Fatigue warning system",
                        type: "bool"
                    },
                    lane_change_assist: {
                        key: "lane_change_assist",
                        name: "Lane change assist",
                        type: "bool"
                    },
                    blind_spot_assist: {
                        key: "blind_spot_assist",
                        name: "Blind spot assist",
                        type: "bool"
                    },
                    autom_dimming_interior_mirror: {
                        key: "autom_dimming_interior_mirror",
                        name: "Autom. dimming interior mirror",
                        type: "bool"
                    },
                    night_vision_assist: {
                        key: "night_vision_assist",
                        name: "Night vision assist",
                        type: "bool"
                    },
                    emergency_brake_assist: {
                        key: "emergency_brake_assist",
                        name: "Emergency brake assist",
                        type: "bool"
                    },
                    emergency_call_system: {
                        key: "emergency_call_system",
                        name: "Emergency call system",
                        type: "bool"
                    },
                    traffic_sign_recognition: {
                        key: "traffic_sign_recognition",
                        name: "Traffic sign recognition",
                        type: "bool"
                    },
                    cruise_control: {
                        key: "cruise_control",
                        name: "Cruise control",
                        type: "select",
                        values: ['Adaptive Cruise Control', 'Cruise Control']
                    },
                    speed_limit_control_system: {
                        key: "speed_limit_control_system",
                        name: "Speed limit control system",
                        type: "bool"
                    },
                    distance_warning_system: {
                        key: "distance_warning_system",
                        name: "Distance warning system",
                        type: "bool"
                    }
                }
            },
            occupant_protection: {
                key: "occupant_protection",
                type: "group",
                name: "Occupant protection",
                items: {
                    airbags: {
                        key: "airbags",
                        name: "Airbags",
                        type: "select",
                        values: ['Driver Airbag', 'Front Airbags', 'Front and Side Airbags', 'Front and Side and More Airbags']
                    },
                    isofix: {
                        key: "isofix",
                        name: "Isofix (child seat anchor points)",
                        type: "bool"
                    },
                    passenger_seat_isofix: {
                        key: "passenger_seat_isofix",
                        name: "Passenger seat Isofix point",
                        type: "bool"
                    }
                }
            },
            light_and_sight: {
                key: "light_and_sight",
                name: "Light and sight",
                type: "group",
                items: {
                    headlights_type: {
                        key: "headlights_type",
                        name: "Headlights type",
                        type: "select",
                        values: ['Bi-xenon headlights', 'Laser headlights', 'Led headlights', 'Xenon headlights']
                    },
                    headlight_washer_system: {
                        key: "headlight_washer_system",
                        name: "Headlight washer system",
                        type: "bool"
                    },
                    full_beam: {
                        type: "group",
                        name: "Full beam",
                        items: {
                            glare_free_high_beam_headlights: {
                                key: "glare_free_high_beam_headlights",
                                name: "Glare-free high beam headlights",
                                type: "bool"
                            },
                            high_beam_assist: {
                                key: "high_beam_assist",
                                name: "High beam assist",
                                type: "bool"
                            },
                            daytime_running_lights: {
                                key: "daytime_running_lights",
                                name: "Daytime running lights",
                                type: "select",
                                values: ['Daytime running lights', 'Led running lights']
                            },
                            adaptive_lighting: {
                                key: "adaptive_lighting",
                                name: "Adaptive lighting",
                                type: "select",
                                values: ['Adaptive cornering lights', 'Adaptive lighting']
                            },
                            fog_lamp: {
                                key: "fog_lamp",
                                name: "Fog lamp",
                                type: "bool"
                            }
                        }
                    }
                }
            },
            theft_protection: {
                key: "theft_protection",
                name: "Theft protection",
                type: "group",
                items: {
                    alarm_system: {
                        key: "alarm_system",
                        name: "Alarm system",
                        type: "bool"
                    },
                    engine_immobilizer: {
                        key: "engine_immobilizer",
                        name: "Engine immobilizer",
                        type: "bool"
                    }
                }
            }
        }
    },
    comfort: {
        key: "comfort",
        name: "Comfort",
        type: "group",
        items: {
            climate_control: {
                key: "climate_control",
                name: "Climate Control",
                type: "group",
                items: {
                    climatisation: {
                        key: "climatisation",
                        name: "Climatisation",
                        type: "select",
                        values: [
                            'A/C (man.)',
                            'Automatic air conditioning',
                            'Automatic climatisation, 2 zones',
                            'Automatic climatisation, 3 zones',
                            'Automatic climatisation, 4 zones',
                            'No climatisation']
                    },
                    auxiliary_heating: {
                        key: "auxiliary_heating",
                        name: "Auxiliary heating",
                        type: "bool"
                    },
                    heated_windshield: {
                        key: "heated_windshield",
                        name: "Heated windshield",
                        type: "bool"
                    },
                    heated_steering_wheel: {
                        key: "heated_steering_wheel",
                        name: "Heated steering wheel",
                        type: "bool"
                    }
                }
            },
            parking_sensors: {
                key: "parking_sensors",
                name: "Parking sensors",
                type: "group",
                items: {
                    self_steering_systems: {
                        key: "self_steering_systems",
                        name: "Self-steering systems",
                        type: "bool"
                    },
                    acoustic_parking_assistent: {
                        key: "acoustic_parking_assistent",
                        name: "Acoustic parking assistent",
                        type: "group",
                        items: {
                            front: {
                                key: "front",
                                name: "Front",
                                type: "bool"
                            },
                            rear: {
                                key: "rear",
                                name: "Rear",
                                type: "bool"
                            }
                        }
                    },
                    visual_parking_assistent: {
                        key: "visual_parking_assistent",
                        name: "Visual parking assistent",
                        type: "group",
                        items: {
                            camera: {
                                key: "camera",
                                name: "Camera",
                                type: "bool"
                            },
                            camera_360: {
                                key: "camera_360",
                                name: "360° camera",
                                type: "bool"
                            }
                        }
                    }
                }
            },
            seats: {
                key: "seats",
                name: "Seats",
                type: "group",
                items: {
                    electric_heated_seats: {
                        key: "electric_heated_seats",
                        name: "Electric heated seats",
                        type: "group",
                        items: {
                            front: {
                                key: "front",
                                name: "Front",
                                type: "bool"
                            },
                            back: {
                                key: "back",
                                name: "Back",
                                type: "bool"
                            }
                        }
                    },
                    electric_adjustable_seats: {
                        key: "electric_adjustable_seats",
                        name: "Electric adjustable seats",
                        type: "group",
                        items: {
                            front: {
                                key: "front",
                                name: "Front",
                                type: "bool"
                            },
                            back: {
                                key: "back",
                                name: "Back",
                                type: "bool"
                            }
                        }
                    },
                    other_features: {
                        key: "other_features",
                        name: "Other features",
                        type: "group",
                        items: {
                            sport_seats: {
                                key: "sport_seats",
                                name: "Sport seats",
                                type: "bool"
                            },
                            arm_rest: {
                                key: "arm_rest",
                                name: "Arm rest",
                                type: "bool"
                            },
                            lumbar_support: {
                                key: "lumbar_support",
                                name: "Lumbar support",
                                type: "bool"
                            },
                            massage_seats: {
                                key: "massage_seats",
                                name: "Massage seats",
                                type: "bool"
                            },
                            seat_ventilation: {
                                key: "seat_ventilation",
                                name: "Seat ventilation",
                                type: "bool"
                            },
                            fold_flat_passenger_seat: {
                                key: "fold_flat_passenger_seat",
                                name: "Fold flat passenger seat",
                                type: "bool"
                            }
                        }
                    },
                    other_comfort_equipment: {
                        key: "other_comfort_equipment",
                        name: "Other comfort equipment",
                        type: "group",
                        items: {
                            electric_windows: {
                                key: "electric_windows",
                                name: "Electric windows",
                                type: "bool"
                            },
                            electric_side_mirror: {
                                key: "electric_side_mirror",
                                name: "Electric side mirror",
                                type: "bool"
                            },
                            electric_tailgate: {
                                key: "electric_tailgate",
                                name: "Electric tailgate",
                                type: "bool"
                            },
                            central_locking: {
                                key: "central_locking",
                                name: "Central locking",
                                type: "bool"
                            },
                            keyless_central_locking: {
                                key: "keyless_central_locking",
                                name: "Keyless central locking",
                                type: "bool"
                            },
                            light_sensor: {
                                key: "light_sensor",
                                name: "Light sensor",
                                type: "bool"
                            },
                            rain_sensor: {
                                key: "rain_sensor",
                                name: "Rain sensor",
                                type: "bool"
                            },
                            power_assisted_steering: {
                                key: "power_assisted_steering",
                                name: "Power Assisted Steering",
                                type: "bool"
                            },
                            ambient_lighting: {
                                key: "ambient_lighting",
                                name: "Ambient lighting",
                                type: "bool"
                            },
                            leather_steering_wheel: {
                                key: "leather_steering_wheel",
                                name: "Leather steering wheel",
                                type: "bool"
                            }
                        }
                    }
                }
            }

        }
    },
    infotainment: {
        key: "Infotainment",
        name: "Infotainment",
        type: "group",
        items: {
            multimedia: {
                key: "multimedia",
                name: "Multimedia",
                type: "group",
                items: {
                    tuner_radio: {
                        key: "tuner_radio",
                        name: "Tuner/radio",
                        type: "bool"
                    },
                    dab_radio: {
                        key: "dab_radio",
                        name: "DAB radio",
                        type: "bool"
                    },
                    cd_player: {
                        key: "cd_player",
                        name: "CD player",
                        type: "bool"
                    },
                    tv: {
                        key: "tv",
                        name: "TV",
                        type: "bool"
                    },
                    navigation_system: {
                        key: "navigation_system",
                        name: "Navigation system",
                        type: "bool"
                    },
                    sound_system: {
                        key: "sound_system",
                        name: "Sound system",
                        type: "bool"
                    }
                }
            },
            handling_and_control: {
                key: "handling_and_control",
                name: "Handling and control",
                type: "group",
                items: {
                    touchscreen: {
                        key: "touchscreen",
                        name: "Touchscreen",
                        type: "bool"
                    },
                    voice_control: {
                        key: "voice_control",
                        name: "Voice control",
                        type: "bool"
                    },
                    multifunction_steering_wheel: {
                        key: "multifunction_steering_wheel",
                        name: "Multifunction steering wheel",
                        type: "bool"
                    },
                    hands_free_kit: {
                        key: "hands_free_kit",
                        name: "Hands-free kit",
                        type: "bool"
                    }
                }
            },
            connectivity_and_interfaces: {
                key: "connectivity_and_interfaces",
                name: "Connectivity and interfaces",
                type: "group",
                items: {
                    usb_port: {
                        key: "usb_port",
                        name: "USB port",
                        type: "bool"
                    },
                    bluetooth: {
                        key: "bluetooth",
                        name: "Bluetooth",
                        type: "bool"
                    },
                    apple_carPlay: {
                        key: "apple_carPlay",
                        name: "Apple CarPlay",
                        type: "bool"
                    },
                    android_auto: {
                        key: "android_auto",
                        name: "Android Auto",
                        type: "bool"
                    },
                    wlan_wifi_hotspot: {
                        key: "wlan_wifi_hotspot",
                        name: "WLAN / WiFi hotspot",
                        type: "bool"
                    },
                    integrated_music_streaming: {
                        key: "integrated_music_streaming",
                        name: "Integrated music streaming",
                        type: "bool"
                    },
                    induction_charging_for_smartphones: {
                        key: "induction_charging_for_smartphones",
                        name: "Induction charging for smartphones",
                        type: "bool"
                    }
                }
            },
            cockpit_display: {
                key: "cockpit_display",
                name: "Cockpit display",
                type: "group",
                items: {
                    on_board_computer: {
                        key: "on_board_computer",
                        name: "On-board computer",
                        type: "bool"
                    },
                    head_up_display: {
                        key: "head_up_display",
                        name: "Head-up display",
                        type: "bool"
                    },
                    digital_cockpit: {
                        key: "digital_cockpit",
                        name: "Digital cockpit",
                        type: "bool"
                    }
                }
            }
        }
    },
    extras: {
        key: "extras",
        name: "Extras",
        type: "group",
        items: {
            tires_and_rims: {
                key: "tires_and_rims",
                name: "Tires and rims",
                type: "group",
                items: {
                    alloy_wheels: {
                        key: "alloy_wheels",
                        name: "Alloy wheels",
                        type: "bool",
                    },
                    summer_tyres: {
                        key: "summer_tyres",
                        name: "Summer tyres",
                        type: "bool",
                    },
                    winter_tyres: {
                        key: "winter_tyres",
                        name: "Winter tyres",
                        type: "bool",
                    },
                    all_season_tyres: {
                        key: "all_season_tyres",
                        name: "All season tyress",
                        type: "bool",
                    },
                    breakdown_service: {
                        key: "breakdown_service",
                        name: "Breakdown service",
                        type: "select",
                        values: [
                            'Emergency tyre',
                            'Emergency tyre repair kit',
                            'Spare tyre',
                        ]
                    },
                    tyre_pressure_monitoring: {
                        key: "tyre_pressure_monitoring",
                        name: "Tyre pressure monitoring",
                        type: "bool",
                    }
                }
            },
            special_features: {
                key: "special_features",
                name: "Special features",
                type: "group",
                items: {
                    winter_package: {
                        key: "winter_package",
                        name: "Winter package",
                        type: "bool",
                    },
                    smoker_package: {
                        key: "smoker_package",
                        name: "Smoker's package",
                        type: "bool",
                    },
                    sports_package: {
                        key: "sports_package",
                        name: "Sports package",
                        type: "bool",
                    },
                    sports_suspension: {
                        key: "sports_suspension",
                        name: "Sports suspension",
                        type: "bool",
                    },
                    air_suspension: {
                        key: "air_suspension",
                        name: "Air suspension",
                        type: "bool",
                    },
                    trailer_coupling: {
                        key: "trailer_coupling",
                        name: "Trailer coupling",
                        type: "bool",
                    },
                    trailer_coupling: {
                        key: "trailer_coupling",
                        name: "Trailer coupling",
                        type: "select",
                        values: [
                            'Trailer coupling, detachable',
                            'Trailer coupling, swiveling',
                            'Trailer coupling fix'
                        ]
                    },
                    cargo_barrier: {
                        key: "cargo_barrier",
                        name: "Cargo barrier",
                        type: "bool",
                    },
                    ski_bag: {
                        key: "ski_bag",
                        name: "Ski bag",
                        type: "bool",
                    },
                    sunroof: {
                        key: "sunroof",
                        name: "Sunroof",
                        type: "bool",
                    },
                    panoramic_roof: {
                        key: "panoramic_roof",
                        name: "Panoramic roof",
                        type: "bool",
                    },
                    roof_rack: {
                        key: "roof_rack",
                        name: "Roof rack",
                        type: "bool",
                    },
                    disabled_accessible: {
                        key: "disabled_accessible",
                        name: "Disabled accessible",
                        type: "bool",
                    },
                    taxi: {
                        key: "taxi",
                        name: "Taxi",
                        type: "bool",
                    }
                }
            }
        }
    }
}


export const state = {
  oldObjectServices: {
    "podderzhka": {
      "title": "Поддерживающая уборка",
      "service": "podderzhka",
      "class": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "squareSwitch"
        }
      ],
      "quantity": {
        "changeable": false
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": [
          {
            'title': 'Разовая',
            'value': '0x_week'
          },
          {
            'title': 'Раз в неделю',
            'value': '1x_week'
          },
          {
            'title': 'Раз в 2 недели',
            'value': '2x_week'
          }
        ]
      },
      "additionWorks": ["wash_cupboard_inside", "refrigerator_cleaning", "linen_wash", "hourly", "wash_oven", "linen_glazhaka"]
    },

    "light": {
      "title": "Легкая уборка",
      "service": "light",
      "class": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "squareSwitch"
        }
      ],
      "quantity": {
        "changeable": false
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": [
          {
            'title': 'Разовая',
            'value': '0x_week'
          },
          {
            'title': 'Раз в неделю',
            'value': '1x_week'
          },
          {
            'title': 'Раз в 2 недели',
            'value': '2x_week'
          }
        ]
      },
      "additionWorks": ["washing_hood_outside", "washing_microwave", "refrigerator_cleaning", "replacement_bed_linen", "wash_oven"]
    },

    "general": {
      "title": "Генеральная уборка",
      "service": "general",
      "class": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "squareSwitch"
        }
      ],
      "quantity": {
        "changeable": false
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": []
      },
      "additionWorks": ["linen_glazhaka", "linen_wash", "hourly"]
    },

    "complex": {
      "title": "Комплексная уборка",
      "service": "complex",
      "class": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "squareSwitch"
        }
      ],
      "quantity": {
        "changeable": false
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": []
      },
      "additionWorks": ["wash_cupboard_inside", "refrigerator_cleaning", "linen_wash", "hourly", "wash_oven", "linen_glazhaka"]
    },

    "washwindow": {
      "title": "Мытье окон",
      "service": "window_cleaning",
      "class": "window_space",
      "classId": "window_space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "squareSwitch"
        },

        {
          "feature": "side",
          "changeable": false,
          "value": "twoside"
        },

        {
          "feature": "kind_frame",
          "changeable": false,
          "value": "one-piece"
        }
      ],
      "quantity": {
        "changeable": false
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": []
      },
      "additionWorks": ["balcony", "grate_one_window", "windowblind_one", "siding_balcony"]
    },

    "posle": {
      "title": "Уборка после ремонта",
      "service": "posle",
      "class": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "squareSwitch"
        },
        {
          "feature": "furniture",
          "changeable": true,
          "view": "control",
          "title": "С мебелью",
          "default": "with",
          "values": [ "with", "without" ]
        }
      ],
      "quantity": {
        "changing": false
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": []
      },
      "additionWorks": ["linen_glazhaka", "linen_wash", "hourly"]
    }
  }
}

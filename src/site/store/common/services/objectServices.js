
export const state = {
  objectServices: {
    "podderzhka": {
      "title": "Поддерживающая уборка",
      "service": "podderzhka",
      "class": "space",
      "classId": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Выберите площадь квартиры",
          "values": [ 40, 50, 60, 70, 80, 90 ],
          "default": 40
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "schedule": {
        "changeable": true,
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
        ],
        "title": "Частота уборки",
        "view": "radioButtons",
        "comment": "При регулярной уборке предоставляется скидка до 35%"
      },
      "addition": ['window_cleaning', 'wet_cleaning_of_surfaces'],
      "additionWorks": ["wash_cupboard_inside", "refrigerator_cleaning", "linen_wash", "hourly", "wash_oven", "linen_glazhaka"]
    },

    "light": {
      "title": "Легкая уборка",
      "service": "light",
      "class": "space",
      "classId": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Выберите площадь квартиры",
          "values": [ 40, 50, 60, 70, 80, 90 ],
          "default": 40
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "schedule": {
        "changeable": true,
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
        ],
        "title": "Частота уборки",
        "view": "radioButtons",
        "comment": "При регулярной уборке предоставляется скидка до 35%"
      },
      "addition": ['window_cleaning'],
      "additionWorks": ["washing_hood_outside", "washing_microwave", "refrigerator_cleaning", "replacement_bed_linen", "wash_oven", "washing_bathtub"]
    },

    "general": {
      "title": "Генеральная уборка",
      "service": "general",
      "class": "space",
      "classId": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Выберите площадь квартиры",
          "values": [ 40, 50, 60, 70, 80, 90 ],
          "default": 40
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": []
      },
      "addition": ['window_cleaning'],
      "additionWorks": ["linen_glazhaka", "linen_wash", "hourly"]
    },

    "complex": {
      "title": "Комплексная уборка",
      "service": "complex",
      "class": "space",
      "classId": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Выберите площадь квартиры",
          "values": [ 40, 50, 60, 70, 80, 90 ],
          "default": 40
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": []
      },
      "addition": ['window_cleaning'],
      "additionWorks": ["wash_cupboard_inside", "refrigerator_cleaning", "linen_wash", "hourly", "wash_oven", "linen_glazhaka"]
    },

    "window_cleaning": {
      "title": "Мытье окон",
      "service": "window_cleaning",
      "class": "window_space",
      "classId": "window_space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Выберите площадь квартиры",
          "values": [ 40, 50, 60, 70, 80, 90 ],
          "default": 40
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
        "changeable": false,
        "default": 1
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": []
      },
      "addition": [],
      "additionWorks": ["balcony", "grate_one_window", "windowblind_one", "siding_balcony"]
    },

    "posle": {
      "title": "Уборка после ремонта",
      "service": "posle",
      "class": "space",
      "classId": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "'Выберите площадь квартиры",
          "values": [ 40, 50, 60, 70, 80, 90 ],
          "default": 40
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
        "changing": false,
        "default": 1
      },
      "schedule": {
        "default": {
          'title': 'Разовая',
          'value': '0x_week'
        },
        "list": []
      },
      "addition": ['window_cleaning'],
      "additionWorks": ["linen_glazhaka", "linen_wash", "hourly"]
    },

    "wet_cleaning_of_surfaces": {
      "title": "Влажная уборка",
      "service": "wet_cleaning_of_surfaces",
      "class": "space",
      "classId": "space",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Выберите площадь квартиры",
          "values": [ 40, 50, 60, 70, 80, 90 ],
          "default": 40
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "schedule": {
        "changeable": true,
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
        ],
        "title": "Частота уборки",
        "view": "radioButtons",
        "comment": "При регулярной уборке предоставляется скидка до 35%"
      },
      "addition": ['window_cleaning', 'wet_cleaning_of_surfaces'],
      "additionWorks": ["wash_cupboard_inside", "refrigerator_cleaning", "linen_wash", "hourly", "wash_oven", "linen_glazhaka"]
    },
  }
}


export const state = {
  objectClasses: {
    "wash_cupboard_inside": {
      "title": "Мытьё кухонных шкафчиков",
      "service": "individual_work",
      "class": "wash_cupboard_inside",
      "classId": "wash_cupboard_inside",
      "img": "serviceKitchenShelves",
      "altText": "Шкафчик",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 99,
      "unit": "кухня"
    },

    "refrigerator_cleaning": {
      "title": "Мытьё холодильника внутри",
      "service": "individual_work",
      "class": "refrigerator_cleaning",
      "classId": "refrigerator_cleaning",
      "img": "serviceRefrigerator",
      "imgText": "Шкафчик",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 99,
      "unit": "шт"
    },

    "linen_wash": {
      "title": "Стирка белья",
      "service": "individual_work",
      "class": "linen_wash",
      "classId": "linen_wash",
      "img": "serviceWashingMachine",
      "imgText": "Стиральная машина",
      "features": [
        {
          "feature": "load_washer",
          "changeable": true,
          "view": "cards"
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "max": 99,
      "unit": "кол-во загрузок"
    },

    "hourly": {
      "title": "Почасовая работа",
      "service": "individual_work",
      "class": "hourly",
      "classId": "hourly",
      "img": "serviceHourWork",
      "imgText": "Швабра",
      "features": [
        {
          "feature": "hour",
          "changeable": true,
          "view": "cards"
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "max": 99,
      "unit": "час"
    },

    "wash_oven": {
      "title": "Мытье духового шкафа внутри",
      "service": "individual_work",
      "class": "wash_oven",
      "classId": "wash_oven",
      "img": "serviceCleaningOven",
      "imgText": "Духовка",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 99,
      "unit": "шт"
    },

    "linen_glazhaka": {
      "title": "Глажка белья",
      "service": "glazhka",
      "class": "linen_glazhaka",
      "classId": "linen_glazhaka",
      "img": "serviceIroning",
      "imgText": "Утюг",
      "features": [
        {
          "feature": "hour",
          "changeable": true,
          "view": "cards"
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "max": 99,
      "unit": "час"
    },

    "washing_hood_outside": {
      "title": "Мытьё вытяжки снаружи",
      "service": "individual_work",
      "class": "washing_hood_outside",
      "classId": "washing_hood_outside",
      "img": "serviceExtract",
      "imgText": "Вытяжка",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 99,
      "unit": "шт"
    },

    "washing_microwave": {
      "title": "Мытьё микроволновой печи внутри",
      "service": "individual_work",
      "class": "washing_microwave",
      "classId": "washing_microwave",
      "img": "serviceMicrowave",
      "imgText": "Микроволновка",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 99,
      "unit": "шт"
    },

    "replacement_bed_linen": {
      "title": "Замена постельного белья",
      "service": "individual_work",
      "class": "replacement_bed_linen",
      "classId": "replacement_bed_linen",
      "img": "serviceBed",
      "imgText": "Кровать",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 99,
      "unit": "комплект"
    },

    "washing_bathtub": {
      "title": "Помыть ванну, душевую кабину",
      "service": "individual_work",
      "class": "washing_bathtub",
      "classId": "washing_bathtub",
      "img": "serviceBath",
      "imgText": "Душевая",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 99,
      "unit": "шт"
    },

    "balcony": {
      "title": "Балкон",
      "service": "window_cleaning",
      "class": "balcony",
      "classId": "balcony",
      "img": "serviceBalcony",
      "altText": "Окно",
      "features": [
        {
          "feature": "casement",
          "changeable": true,
          "view": "cards"
        },
        {
          "feature": "side",
          "value": "twoside",
          "changeable": false,
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "max": 99,
      "unit": "кол-во створок"
    },

    "siding_balcony": {
      "title": "Cайдинг",
      "service": "window_cleaning",
      "class": "siding_balcony",
      "classId": "siding_balcony",
      "img": "serviceWindowSiding",
      "altText": "Cайдинг",
      "features": [
        {
          "feature": "number_of_balconies",
          "changeable": true,
          "view": "cards"
        }
      ],
      "quantity": {
        "changeable": false,
        "default": 1
      },
      "max": 99,
      "unit": "кол-во балконов"
    },

    "grate_one_window":{
      "title": "Оконные решетки",
      "service": "window_cleaning",
      "class": "grate_one_window",
      "classId": "grate_one_window",
      "img": "serviceWindowGrille",
      "altText": "Решётка",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 999,
      "unit": "окно",
    },

    "windowblind_one": {
      "title": "Мытьё жалюзи",
      "service": "window_cleaning",
      "class": "windowblind_one",
      "classId": "windowblind_one",
      "img": "serviceWindowBlinds",
      "altText": "Жалюзи",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "cards"
      },
      "max": 999,
      "unit": "окно",
    },

    "carpet": {
      "title": "Ковер",
      "service": "dry_cleaning",
      "class": "carpet",
      "classId": "carpet",
      "img": "serviceCarpet",
      "altText": "Ковер",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "synthetics",
          "values": [
            {
              title: 'Синтетика',
              value: "synthetics"
            },
            {
              title: 'Хлопок',
              value: "cotton"
            },
            {
              title: 'Вискоза',
              value: "viscose"
            }
          ]
        },
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Площадь м2",
          "values": [ 4, 6, 8, 10 ],
          "default": 4
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "carpeting": {
      "title": "Ковролин",
      "service": "dry_cleaning",
      "class": "carpeting",
      "classId": "carpeting",
      "img": "serviceСarpeting",
      "altText": "Ковролин",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Площадь м2",
          "values": [ 4, 6, 8, 10 ],
          "default": 4
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "sofa": {
      "title": "Диван",
      "service": "dry_cleaning",
      "class": "sofa",
      "classId": "sofa",
      "img": "serviceSofa",
      "altText": "Диван",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Простая ткань',
              value: "plain_fabric"
            },
            {
              title: 'Кожа',
              value: "leather"
            },
            {
              title: 'Велюр',
              value: "velour"
            }
          ]
        },
        {
          "feature": "number_of_seats",
          "changeable": true,
          "view": "switchCounter",
          "title": "Количество посадочных мест",
          "values": [ 1, 2, 3, 4 ],
          "default": 1
        },
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "folding-sofa": {
      "title": "Раскладной диван",
      "service": "dry_cleaning",
      "class": "folding-sofa",
      "classId": "folding-sofa",
      "img": "serviceFoldingSofa",
      "altText": "Раскладной диван",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Простая ткань',
              value: "plain_fabric"
            },
            {
              title: 'Кожа',
              value: "leather"
            },
            {
              title: 'Велюр',
              value: "velour"
            }
          ]
        },
        {
          "feature": "number_of_seats",
          "changeable": true,
          "view": "switchCounter",
          "title": "Количество посадочных мест",
          "values": [ 1, 2, 3, 4 ],
          "default": 1
        },
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "armchair": {
      "title": "Кресло",
      "service": "dry_cleaning",
      "class": "armchair",
      "classId": "armchair",
      "img": "serviceArmchair",
      "altText": "Кресло",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Простая ткань',
              value: "plain_fabric"
            },
            {
              title: 'Кожа',
              value: "leather"
            },
            {
              title: 'Велюр',
              value: "velour"
            }
          ]
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "armchair-bed": {
      "title": "Кресло кровать",
      "service": "dry_cleaning",
      "class": "armchair-bed",
      "classId": "armchair-bed",
      "img": "serviceArmchairBed",
      "altText": "Кресло кровать",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Простая ткань',
              value: "plain_fabric"
            },
            {
              title: 'Кожа',
              value: "leather"
            },
            {
              title: 'Велюр',
              value: "velour"
            }
          ]
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "half-armchair": {
      "title": "Полукресло",
      "service": "dry_cleaning",
      "class": "half-armchair",
      "classId": "half-armchair",
      "img": "serviceHalfArmchair",
      "altText": "Полукресло",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Простая ткань',
              value: "plain_fabric"
            },
            {
              title: 'Кожа',
              value: "leather"
            },
            {
              title: 'Велюр',
              value: "velour"
            }
          ]
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "chair": {
      "title": "Стул",
      "service": "dry_cleaning",
      "class": "chair",
      "classId": "chair",
      "img": "serviceChair",
      "altText": "Стул",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "fabric-chair": {
      "title": "Стул с тканевой спинкой",
      "service": "dry_cleaning",
      "class": "fabric-chair",
      "classId": "fabric-chair",
      "img": "serviceFabricChair",
      "altText": "Стул с тканевой спинкой",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "office-chair": {
      "title": "Офисный стул",
      "service": "dry_cleaning",
      "class": "office-chair",
      "classId": "office-chair",
      "img": "serviceOfficeChair",
      "altText": "Офисный стул",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Простая ткань',
              value: "plain_fabric"
            },
            {
              title: 'Кожа',
              value: "leather"
            },
            {
              title: 'Велюр',
              value: "velour"
            }
          ]
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "padded-stool": {
      "title": "Пуфик",
      "service": "dry_cleaning",
      "class": "padded-stool",
      "classId": "padded-stool",
      "img": "servicePaddedStool",
      "altText": "Пуфик",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Простая ткань',
              value: "plain_fabric"
            },
            {
              title: 'Кожа',
              value: "leather"
            },
            {
              title: 'Велюр',
              value: "velour"
            }
          ]
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "kitchen-corner": {
      "title": "Кухонный уголок",
      "service": "dry_cleaning",
      "class": "kitchen-corner",
      "classId": "kitchen-corner",
      "img": "serviceKitchenCorner",
      "altText": "Кухонный уголок",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Простая ткань',
              value: "plain_fabric"
            },
            {
              title: 'Кожа',
              value: "leather"
            },
            {
              title: 'Велюр',
              value: "velour"
            }
          ]
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "curtain": {
      "title": "Шторы",
      "service": "dry_cleaning",
      "class": "curtain",
      "classId": "curtain",
      "img": "serviceСurtain",
      "altText": "Шторы",
      "features": [
        {
          "feature": "side",
          "changeable": true,
          "view": "radioButtons",
          "default": "oneside",
          "values": [
            {
              title: 'Однослойная',
              value: "oneside"
            },
            {
              title: 'Двойная',
              value: "twoside"
            }
          ]
        },
        {
          "feature": "square",
          "changeable": true,
          "view": "squareInputs"
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "roman-blind": {
      "title": "Римские",
      "service": "dry_cleaning",
      "class": "roman-blind",
      "classId": "roman-blind",
      "img": "serviceRomanBlind",
      "altText": "Римские",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "squareInputs"
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "lambrequin": {
      "title": "Ламбрекен",
      "service": "dry_cleaning",
      "class": "lambrequin",
      "classId": "lambrequin",
      "img": "serviceLambrequin",
      "altText": "Ламбрекен",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "squareInputs"
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "blind": {
      "title": "Жалюзи",
      "service": "dry_cleaning",
      "class": "blind",
      "classId": "blind",
      "img": "serviceBlind",
      "altText": "Жалюзи",
      "features": [
        {
          "feature": "material",
          "changeable": true,
          "view": "radioButtons",
          "default": "plain_fabric",
          "values": [
            {
              title: 'Ткань',
              value: "plain_fabric"
            },
            {
              title: 'Металл',
              value: "metal"
            }
          ]
        },
        {
          "feature": "square",
          "changeable": true,
          "view": "squareInputs"
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "bed-frame": {
      "title": "Каркас кровати",
      "service": "dry_cleaning",
      "class": "bed-frame",
      "classId": "bed-frame",
      "img": "serviceBedFrame",
      "altText": "Каркас кровати",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "mattress": {
      "title": "Матрас",
      "service": "dry_cleaning",
      "class": "mattress",
      "classId": "mattress",
      "img": "serviceMattress",
      "altText": "Матрас",
      "features": [
        {
          "feature": "size",
          "changeable": true,
          "view": "radioButtons",
          "default": "single",
          "values": [
            {
              title: 'Односпальный',
              value: "single"
            },
            {
              title: 'Полутораспальный',
              value: "one_a_half"
            },
            {
              title: 'Двухспальный',
              value: "double"
            },
            {
              title: 'Детский',
              value: "child"
            },
            {
              title: 'Евро',
              value: "euro"
            }
          ]
        },
        {
          "feature": "side",
          "changeable": true,
          "view": "control",
          "title": "с двух сторон",
          "default": "twoside",
          "values": [ "twoside", "oneside" ]
        },
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "spotting": {
      "title": "Пятновыведение",
      "service": "dry_cleaning",
      "class": "spotting",
      "classId": "spotting",
      "img": "serviceSpotting",
      "altText": "Пятновыведение",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Количество посадочных мест",
          "values": [],
          "default": 0
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "removing_gum": {
      "title": "Удаление жвачки",
      "service": "dry_cleaning",
      "class": "removing_gum",
      "classId": "removing_gum",
      "img": "serviceRemovingGum",
      "altText": "Удаление жвачки",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Количество посадочных мест",
          "values": [],
          "default": 0
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },

    "removing_smell_urine": {
      "title": "Удаление запаха урины",
      "service": "dry_cleaning",
      "class": "removing_smell_urine",
      "classId": "removing_smell_urine",
      "img": "serviceRemovingSmellUrine",
      "altText": "Удаление запаха урины",
      "features": [
        {
          "feature": "square",
          "changeable": true,
          "view": "switchCounter",
          "title": "Количество посадочных мест",
          "values": [],
          "default": 0
        }
      ],
      "quantity": {
        "changeable": true,
        "view": "counter"
      },
      "max": 99,
      "unit": "штук"
    },
  }
}


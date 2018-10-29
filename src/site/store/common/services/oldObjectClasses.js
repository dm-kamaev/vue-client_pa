
export const state = {
  oldObjectClasses: {
    "wash_cupboard_inside": {
      "title": "Мытьё кухонных шкафчиков внутри",
      "service": "individual_work",
      "class": "wash_cupboard_inside",
      "classId": "wash_cupboard_inside",
      "img": "serviceKitchenShelves",
      "altText": "Шкафчик",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "card"
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
        "view": "card"
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
          "view": "card"
        }
      ],
      "quantity": {
        "changeable": false
      },
      "max": 99,
      "unit": "шт"
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
          "view": "card"
        }
      ],
      "quantity": {
        "changeable": false
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
        "view": "card"
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
          "view": "card"
        }
      ],
      "quantity": {
        "changeable": false
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
        "view": "card"
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
        "view": "card"
      },
      "max": 99,
      "unit": "шт"
    },

    "replacement_bed_linen": {
      "title": "Замена постельного белья (комплект)",
      "service": "individual_work",
      "class": "replacement_bed_linen",
      "classId": "replacement_bed_linen",
      "img": "serviceBed",
      "imgText": "Кровать",
      "features": [],
      "quantity": {
        "changeable": true,
        "view": "card"
      },
      "max": 99,
      "unit": "шт"
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
        "view": "card"
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
          "view": "card"
        },
        {
          "feature": "side",
          "value": "twoside",
          "changeable": false,
        }
      ],
      "quantity": {
        "changeable": false
      },
      "max": 99,
      "unit": "шт"
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
          "view": "card"
        }
      ],
      "quantity": {
        "changeable": false
      },
      "max": 99,
      "unit": "количество балконов"
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
        "view": "card"
      },
      "max": 999,
      "unit": "м<sup><small>2</small></sup>",
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
        "view": "card"
      },
      "max": 999,
      "unit": "м<sup><small>2</small></sup>",
    }
  }
}


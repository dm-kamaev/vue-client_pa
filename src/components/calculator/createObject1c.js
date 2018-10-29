function createObject1c(services, service, ...elements) {
  let exist = services.some(function (item) {
    return item.service === service.service
  });

  if (!exist) {
    let data = {
      "service": service.service,
      "objectclass": []
    };

    services.push(data);
  }

  services.forEach(function (data) {
    if (data.service === service.service) {
      addService(data);
    }
  });

  function addService(data) {
    elements.forEach(function (item) {
      addClass(data, item);
    });
  }

  function addClass(data, item) {
    const exist = data.objectclass.some(function (dataItem) {
      return dataItem.class === item.class && dataItem.classid === item.classid;
    });

    if (!exist && item.class) {
      data.objectclass.push({
        "class": item.class,
        "classid": item.classid,
        "sum": item.sum ? Number(item.sum) : 1,
        "features": []
      });
    }

    data.objectclass.forEach(function(dataItem) {
      if (dataItem.class === item.class && dataItem.classid === item.classid) {
        addFeatures(dataItem, item);
      }
    });
  }

  function addFeatures(data, item) {
    let exist = data.features.some(function (dataItem) {
      return dataItem.feature === item.feature;
    });

    if ((!exist && item.feature) || (!exist && item.features)) {
      if (item.feature) {
        data.features.push({
          "feature": item.feature,
          "quantity": isNaN(item.quantity) ? item.quantity : Number(item.quantity)
        });
      }

      if (item.features) {
        item.features.forEach((item) => {
          data.features.push({
            "feature": item.feature,
            "quantity": isNaN(item.quantity) ? item.quantity : Number(item.quantity)
          });
        });
      }
    } else {
      data.features.forEach(function(dataItem) {
        if (dataItem.feature === item.feature) {
          dataItem.quantity = isNaN(item.quantity) ? item.quantity : Number(item.quantity);
        }
      });
    }
  }
};

export default createObject1c;

export default function(data) {
  const json = [];
  const services = {};

  data.forEach((item) => {
    if (!(item.service in services)) {
      services[item.service] = {}
      services[item.service].serviceId = item.serviceId
      services[item.service].service = item.service
      services[item.service].classes = []
    }

    const service = services[item.service]

    item.classes.forEach((objectClass) => {
      if (objectClass.quantity.value) {
        const objectClassItem = {
          "classId" : objectClass.classId,
          "class" : objectClass.class,
          "features": [],
          "quantity": objectClass.quantity.value
        };

        objectClass.features.forEach((element) => {
          const feature = {
            "feature": element.feature,
            "value": element.value.value
          };

          objectClassItem.features.push(feature);
        });

        service.classes.push(objectClassItem);
      }
    });
  });

  for (let key in services) {
    if (services[key].classes.length) {
      json.push(services[key]);
    }
  }

  return json;
}

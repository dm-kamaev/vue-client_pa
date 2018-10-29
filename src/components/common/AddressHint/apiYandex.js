const baseUrl = 'https://geocode-maps.yandex.ru/1.x/';

function filterData(data) {
  const featureMember = data.response.GeoObjectCollection.featureMember.filter((item) => {
    return (item.GeoObject.metaDataProperty.GeocoderMetaData.kind === 'street' || item.GeoObject.metaDataProperty.GeocoderMetaData.kind === 'house')
  });

  return featureMember
}

export async function getGeoObject({format = 'json', city = 'Москва', results = 3, kind, address, coordinate}) {
  let geocode = '';
  if (!coordinate) {
    if (city) geocode += city + ',+';
    if (address) geocode += address;
  } else {
    geocode = coordinate;
  }

  let request = `format=${format}&results=${results}&geocode=${geocode}`

  if (kind) {
    request = `format=${format}&kind=${kind}&results=${results}&geocode=${geocode}`
  }

  const response = await fetch(`${baseUrl}?${request}`, {
    method: 'GET'
  })

  return filterData(await response.json())
}

import httpRequest from '@/request/index'

export function getSingleCollectionById(id, userId) {
  return httpRequest({
    url: 'collections/getSingleCollection',
    method: 'post',
    params: {
      id,
      userId,
    },
  })
}

export function addCollection(name, icon, schema) {
  schema = JSON.stringify(schema)
  return httpRequest({
    url: 'collections/addCollection',
    method: 'post',
    params: { name, icon, schema },
  })
}

export function getAsideCollection() {
  return httpRequest({
    url: 'collections/getAsideCollection',
    method: 'get',
  })
}

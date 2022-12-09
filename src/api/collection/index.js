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

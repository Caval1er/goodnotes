import httpRequest from '@/request/index'

export function getCollectionViewByCollectionId(id) {
  return httpRequest({
    url: 'collectionViews/getCollectionViewByCollectionId',
    method: 'get',
    params: {
      id,
    },
  })
}
export function getCollectionViewById(id) {
  return httpRequest({
    url: 'collectionViews/getCollectionViewById',
    method: 'get',
    params: {
      id,
    },
  })
}

export function add(name, type, collectionId) {
  return httpRequest({
    url: 'collectionViews/add',
    method: 'post',
    params: {
      name,
      type,
      collectionId,
    },
  })
}

export function deleteView(name) {
  return httpRequest({
    url: 'collectionViews/deleteCollectionViewByName',
    method: 'post',
    params: {
      name,
    },
  })
}

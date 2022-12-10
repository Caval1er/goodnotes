import httpRequest from '@/request/index'

export function updateProperties(id, page) {
  const jsonPage = JSON.stringify(page)
  return httpRequest({
    url: 'pages/updateProperties',
    method: 'post',
    params: {
      id,
      properties: jsonPage,
    },
  })
}

export default async function getDataByPage(pagenum: any) {

  const pagesize = 24

  let resArray = []
  for (let i = pagenum * pagesize; (i < pagesize * (pagenum + 1) && i < 10000); i++) {
    resArray.push({
      title: `${1 + i}.jpg`
    })
  }

  return resArray
}
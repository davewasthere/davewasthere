import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const travelDirectory = path.join(process.cwd(), 'travel')

export function getSortedTravelsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(travelDirectory)
  const allTravelsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName // fileName.replace(/\.html$/, '')

    // Read markdown file as string
    const fullPath = path.join(travelDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allTravelsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllTravelIds() {
  const fileNames = fs.readdirSync(travelDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName// fileName.replace(/\.html$/, '')
      }
    }
  })
}

export async function getTravelData(id) {

  // console.log('getTravelData ' + id);

    const fullPath = path.join(travelDirectory, `${id}`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // console.log(matterResult);

    // Use remark to convert markdown into HTML string
    // const processedContent = await remark()
    //   .use(html)
    //   .process(matterResult.content)
    // const contentHtml = processedContent.toString()
  
    const contentHtml = matterResult.content

    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }
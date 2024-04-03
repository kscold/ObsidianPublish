import Head from "next/head"
import Layout from "../../components/Layout"
import {
  getAllSlugs,
  getSinglePost,
  convertObject,
  getDirectoryData,
  constructGraphData,
  getLocalGraphData,
} from "../../lib/utils"
import FolderTree from "../../components/FolderTree"
import { getFlattenArray } from "../../lib/utils"
import MDContent from "../../components/MDContent"
import dynamic from "next/dynamic"
import { Fragment, useState } from "react"

const DynamicGraph = dynamic(() => import("../../components/Graph"), {
  loading: () => <p>Loading ...</p>,
  ssr: false,
})

export default function Home({
  note,
  backLinks,
  fileNames,
  tree,
  flattenNodes,
  graphData,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false) // 모달 열림 상태 관리

  return (
    // <Layout>
    //   <Head>{note.title && <meta name="title" content={note.title} />}</Head>
    //   <div className="container">
    //     <nav className="nav-bar">
    //       <FolderTree tree={tree} flattenNodes={flattenNodes} />
    //     </nav>
    //     <MDContent
    //       content={note.data}
    //       fileNames={fileNames}
    //       handleOpenNewContent={null}
    //       backLinks={backLinks}
    //     />
    //     <DynamicGraph graph={graphData} />
    //   </div>
    // </Layout>
    <Layout>
      <Head>{note.title && <meta name="title" content={note.title} />}</Head>
      <div className="container">
        {isModalOpen && (
          <nav className="nav-bar">
            <FolderTree tree={tree} flattenNodes={flattenNodes} />
          </nav>
        )}

        <div onClick={() => setIsModalOpen((prev) => !prev)}>
          <MDContent
            content={note.data}
            fileNames={fileNames}
            handleOpenNewContent={null}
            backLinks={backLinks}
          />
        </div>
        <DynamicGraph graph={graphData} />
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const allPostsData = getAllSlugs()
  const paths = allPostsData.map((p) => ({ params: { id: p } }))

  return {
    paths,
    fallback: false,
  }
}

const { nodes, edges } = constructGraphData()

export function getStaticProps({ params }) {
  const note = getSinglePost(params.id)
  const tree = convertObject(getDirectoryData())
  const flattenNodes = getFlattenArray(tree)

  const listOfEdges = edges.filter((anEdge) => anEdge.target === params.id)
  const internalLinks = listOfEdges
    .map((anEdge) => nodes.find((aNode) => aNode.slug === anEdge.source))
    .filter((element) => element !== undefined)
  const backLinks = [...new Set(internalLinks)]
  const graphData = getLocalGraphData(params.id)
  return {
    props: {
      note,
      tree: tree,
      flattenNodes: flattenNodes,
      backLinks: backLinks.filter((link) => link.slug !== params.id),
      graphData: graphData,
    },
  }
}

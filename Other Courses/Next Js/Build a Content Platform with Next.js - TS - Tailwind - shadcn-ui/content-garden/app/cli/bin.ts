import { getFolders } from "@/app/cli/sdk";

const main = async () => {
  const { folders } = await getFolders()
  console.log(folders)

}

main().catch((e) => {
  console.log(e)
  process.exit(1)
})









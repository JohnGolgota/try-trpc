import { router, publicProcedure } from "../trpc"

const getNotes = publicProcedure.query(() => {
  return [
    { id: 1, title: "Note 1" },
    { id: 2, title: "Note 2" },
  ]
})

export const notesRouter = router({
  get: getNotes,
})

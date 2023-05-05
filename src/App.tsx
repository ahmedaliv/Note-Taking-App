import {useMemo} from 'react'
import { useLocalStorage } from "./hooks/useLocalStorage"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import {Routes,Route,Navigate} from 'react-router-dom'
import NewNote from "./components/NewNote"
import NoteList from './components/NoteList'
import { v4 as uuidV4 } from "uuid"



export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}


// if i update my tag , i don't have to update every note i'm storing
// i know that as long as my id stay the same , so it will propagate the changes
const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  // loop through my notes , keep info about each one but add tags that has the associated id to it
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note,tags:tags.filter(tag=> note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])
  
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev=>[...prev,tag])
  }
  return (
  <Container className='my-4'>
    <Routes>
      <Route path='/' element={<NoteList availableTags={tags} notes={notesWithTags}/>} />
        <Route path='/new' element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={addTag}
            availableTags={tags}
          />} />
      <Route path='/:id'>
        <Route index element={<h1>Show</h1>} />
        <Route path="edit" element={<h1>Edit</h1>} />
      </Route>
      <Route path='*'  element={<Navigate to='/' />}/>
      </Routes>
    </Container>
  )
}

export default App
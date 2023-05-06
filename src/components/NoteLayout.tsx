import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from '../App'

type NoteLayoutProps = {
    notes: Note[]
}

const NoteLayout = ({notes}:NoteLayoutProps) => {
    const { id } = useParams();
    const note = notes.find(note => note.id === id)
    // replace -> replaces the url so when we click back button , it doesn't bring us back
    if(note==null) return <Navigate to='/' replace/>
    return (
     // to render whatever inside the component  (the one with path=:/id) so it's gonna render what's inside it
    <Outlet context={note}/>
  )
}

export default NoteLayout


// to use inside outlets , to get info about the context
export function useNote() {
    return useOutletContext<Note>()
}
import { Row, Col, Button, Stack, Form,FormGroup } from 'react-bootstrap'
import { useMemo, useState } from 'react'
import ReactSelect from 'react-select'
import { Link } from 'react-router-dom'
import { Note, Tag } from '../App'
type NoteListProps = {
    availableTags: Tag[],
    notes: Note[]
}

const NoteList = ({ availableTags,notes }: NoteListProps) => {
    const [title, setTitle] = useState("")
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
          return (
            (title === "" ||
              note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 ||
              selectedTags.every(tag =>
                note.tags.some(noteTag => noteTag.id === tag.id)
              ))
          )
        })
      }, [title, selectedTags, notes])
    
    return (
      <>
          <Row className='align-items-center mb-4'>
              <Col>
                <h1>Notes</h1>
              </Col>
              <Col xs="auto">
                  <Stack
                  gap={2} direction="horizontal"
                  >
                      <Link to="/new">
                          <Button variant="primary">New Note</Button>
                      </Link>
                      <Link to="/tags">
                          <Button variant="outline-secondary">Edit Tags</Button>
                      </Link>
                      
                  </Stack>
              </Col>
          </Row>
          <Form>
              <Row className="mb-4">
                  <Col>
                      <FormGroup controlId="title">
                          <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={e=>setTitle(e.target.value)}
                            />
                        </FormGroup>
                  </Col>
                  <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                  value={selectedTags.map(tag => {
                    return { label: tag.label, value: tag.id }
                  })}
                  options={availableTags.map(tag => {
                    return { label: tag.label, value: tag.id }
                  })}
                  onChange={tags => {
                    setSelectedTags(
                      tags.map(tag => {
                        return { label: tag.label, id: tag.value }
                      })
                    )
                  }}
                  isMulti
                />
              </Form.Group>
            </Col>
              </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} gap={3}>
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        {note.title}
                        {/* <NoteCard note={note} /> */}
                    </Col>
                ))}

            </Row>
      </>
  )
}

export default NoteList

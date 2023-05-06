import React from 'react'
import { useNote } from './NoteLayout'
import { Col, Row,Stack,Badge, Button } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'


type NoteProps = {
  onDelete: (id:string) => void
}
const Note = ({ onDelete }: NoteProps) => {
  const navigate = useNavigate()
    const note = useNote()
    return (
      <>
      <Row>
          <Col>
            <h2>{note.title}</h2>
            <hr/>
              {note.tags.length > 0 && (
          <Stack direction='horizontal' 
            className='justify-content-center flex-wrap'>
            {note.tags.map(tag => (
              <Badge className='text-truncate' key={tag.id}>
                {tag.label}
              </Badge>
            ))}

            </Stack>
            
        )}
          </Col>
          <Col xs="auto">
                  <Stack
                  gap={2} direction="horizontal"
                  >
                      <Link to={`/${note.id}/edit`}>
                          <Button variant="primary">Edit</Button>
                      </Link>
              <Button
                onClick={
                  () => {
                    onDelete(note.id)
                    navigate("/")
                  }
                }
                variant="outline-danger">Delete</Button>
                  <Link  to='/'>
                  <Button variant="outline-secondary">Back</Button>
                  </Link>                      
                  </Stack>
              </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  )
}

export default Note

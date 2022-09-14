import React, { useRef, useState } from 'react'
import './PostCreate.css'
import { PhotoLibrary, LocationOn, Label, EmojiEmotions, Telegram } from '@mui/icons-material'
import { Avatar, Box, Button, Card, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useCreatePost } from '../../../Apis/PostApi'
import { USER_COOKIE } from '../../../Apis/AuthApi'
import { getCookie } from 'typescript-cookie'
import { toast } from 'react-toastify'

type Props = {}

const PostCreate = ({ }: Props) => {
    const { mutate: createPost, isLoading } = useCreatePost()
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [base64Image, setImage] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string>('')

    const convertToBase64 = () => new Promise<string>((resolve, reject) => {
        const f = new FileReader()
        const file = imageInputRef.current?.files?.[0]
        if (file) {
            f.readAsDataURL(file)
            f.onload = () => resolve(f.result as string)
            f.onerror = () => reject()
        } else {
            reject()
        }
    })

    const handleImageClick = () => {
        imageInputRef.current?.click()
    }
    return (
        <Card>
            <Stack sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                p: 1
            }}>
                <Avatar />
                <TextField sx={{
                    flex: 1,
                    borderRadius: theme => theme.clickerShape.smallBorderRadius
                }}
                    placeholder='Whats on your mind?'
                    variant='standard'
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value)
                    }} />
            </Stack>
            {base64Image ? (
                <Stack sx={{ p: 1 }}>
                    <img src={base64Image} height={'auto'} width={'100%'} />
                </Stack>
            ) : null}
            <hr />
            <Stack sx={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                p: 1
            }}>
                <input className='image-choose' type={'file'} ref={imageInputRef} accept='image/png, image/jpeg' onChange={() => {
                    convertToBase64().then(image => {
                        setImage(image)
                    })
                }} />
                <IconButton onClick={handleImageClick}>
                    <PhotoLibrary color='primary' />
                    <Typography variant='button'>Photos</Typography>
                </IconButton>
                <IconButton>
                    <LocationOn color='secondary' />
                    <Typography variant='button'>Location</Typography>
                </IconButton>
                <IconButton>
                    <Label color='success' />
                    <Typography variant='button'>Tag</Typography>
                </IconButton>
                <IconButton>
                    <EmojiEmotions color='info' />
                    <Typography variant='button'>Emoji</Typography>
                </IconButton>
                <Button
                    variant='outlined'
                    sx={{
                        marginLeft: 'auto'
                    }}
                    startIcon={<Telegram />}
                    onClick={() => {
                        const userId = getCookie(USER_COOKIE) || ''
                        if (userId && description && base64Image) {
                            createPost({
                                userId: userId,
                                desc: description,
                                img: base64Image
                            })
                        } else {
                            if (!description){
                                toast.warn('Description is required')
                            } else if(!base64Image) {
                                toast.warn('Please select and Image')
                            }
                        }
                    }}
                >
                    Share
                </Button>
            </Stack>
        </Card>
    )
}

export default PostCreate
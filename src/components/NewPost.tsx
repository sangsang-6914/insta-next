'use client';

import { AuthUser } from '@/model/user';
import React, { ChangeEvent, DragEvent, useState } from 'react';
import PostUserAvatar from './PostUserAvatar';
import { FaPhotoVideo } from 'react-icons/fa';
import Button from './ui/Button';
import FilesIcon from './icons/FilesIcon';
import Image from 'next/image';

interface Props {
  user: AuthUser;
}

function NewPost({ user }: Props) {
  const { username, image } = user;
  const [isOver, setIsOver] = useState(false);
  const [file, setFile] = useState<File>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    files && setFile(files[0]);
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setIsOver(true);
    } else {
      setIsOver(false);
    }
  };

  const handleOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const files = e.dataTransfer?.files;
    files && setFile(files[0]);
  };
  return (
    <section className="flex flex-col max-w-xl w-full items-center mt-6">
      <PostUserAvatar userImage={image || ''} username={username} />
      <form className="w-full flex flex-col mt-2">
        <input
          type="file"
          id="input-upload"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          className={`flex flex-col w-full h-60 ${!file && 'border-2 border-dashed border-sky-500'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleOver}
          onDrop={handleDrop}
        >
          {isOver && (
            <div className="absolute z-10 inset-0 w-full h-full bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="h-full flex flex-col items-center justify-center">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className='relative w-full aspect-square'>
            <Image
              className="object-cover"
              src={URL.createObjectURL(file)}
              fill
              sizes="650px"
              alt="photo image"
            />
          </div>
          )}
        </label>
        <textarea
          rows={10}
          placeholder="Wrtie a caption..."
          className="border border-neutral-300 rounded-sm w-full outline-none "
        />
        <Button text="Publish" color="blue" onClick={() => {}} />
      </form>
    </section>
  );
}

export default NewPost;

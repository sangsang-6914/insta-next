'use client';

import { AuthUser } from '@/model/user';
import React, {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useRef,
  useState,
} from 'react';
import PostUserAvatar from './PostUserAvatar';
import Button from './ui/Button';
import FilesIcon from './icons/FilesIcon';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GridLoader } from 'react-spinners';

interface Props {
  user: AuthUser;
}

function NewPost({ user }: Props) {
  const { username, image } = user;
  const [isOver, setIsOver] = useState(false);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const textRef = useRef<HTMLTextAreaElement>(null);
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const text = textRef?.current?.value;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text ?? '');
    fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="flex flex-col max-w-xl w-full items-center mt-6">
      {error && (
        <div className="w-full bg-red-300 text-red-500 font-bold p-3 text-center">
          {error}
        </div>
      )}
      {loading && (
        <div className="absolute z-10 inset-0 flex justify-center bg-sky-500/20 pt-52">
          <GridLoader color="red" />
        </div>
      )}
      <PostUserAvatar userImage={image || ''} username={username} />
      <form onSubmit={handleSubmit} className="w-full flex flex-col mt-2">
        <input
          type="file"
          id="input-upload"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          className={`flex flex-col w-full h-60 ${
            !file && 'border-2 border-dashed border-sky-500'
          }`}
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
            <div className="relative w-full aspect-square">
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
          ref={textRef}
          required
        />
        <Button text="Publish" color="blue" onClick={() => {}} />
      </form>
    </section>
  );
}

export default NewPost;

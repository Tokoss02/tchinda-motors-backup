'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Setting } from '@/types/setting'

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting | null>(null)
  const [form, setForm] = useState({ heading: '', subheading: '', imageUrl: '' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    axios.get('/api/settings/home/header').then((res) => {
  const data = res.data as Setting;
  setSettings(data);
  setForm({
    heading: data.heading || '',
    subheading: data.subheading || '',
    imageUrl: data.imageUrl || '',
  });
  setPreview(data.imageUrl || '');
});

  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file)) // Show preview
    }
  }
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files?.length) {
    setFile(e.target.files[0]);
  }
};

  const handleSubmit = async () => {
  if (!settings?._id) return;
  const formData = new FormData();
  formData.append('heading', form.heading);
  formData.append('subheading', form.subheading);
  if (file) formData.append('image', file);

  try {
    await axios.patch(`/api/settings/${settings._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Settings updated');
  } catch (error) {
    alert('Failed to update');
  }
};


  return (
    <div className="container mt-4">
      <h3>Edit Homepage Header</h3>

      <div className="mb-3">
        <label>Heading</label>
        <input name="heading" className="form-control" value={form.heading} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Subheading</label>
        <input name="subheading" className="form-control" value={form.subheading} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label>Image Upload</label>
        <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
        {file && <p>Selected file: {file.name}</p>}
      </div>

      <button onClick={handleSubmit} className="btn btn-primary">Save</button>
    </div>
  )
}

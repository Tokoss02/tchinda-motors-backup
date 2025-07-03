'use client';

import React, { useState } from 'react';
import { Car } from '@/types/carvalue';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

type PreviewImage = {
    id: string;
    file: File | null;
    url: string;
};

interface Step3MediaUploadProps {
    car: Car;
    setCar: (car: Car) => void;
    previews: PreviewImage[];
    setPreviews: React.Dispatch<React.SetStateAction<PreviewImage[]>>;
    imageFiles: File[];
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function Step3MediaUpload({
    car,
    setCar,
    setImageFiles,
}: Step3MediaUploadProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );
    const [previews, setPreviews] = useState<PreviewImage[]>([]);
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        const newPreviews = files.map((file) => ({
            id: uuidv4(),
            url: URL.createObjectURL(file),
            file,
        }));

        setPreviews((prev) => [...prev, ...newPreviews]);        // For showing previews
        setImageFiles((prev) => [...prev, ...files]);            // For uploading in handleSubmit
    };



    const handleRemoveImage = (id: string) => {
        setPreviews((prev) => prev.filter((img) => img.id !== id));
        setImageFiles((prev) => {
            // Remove the file matching the preview id
            const removedIndex = previews.findIndex((img) => img.id === id);
            if (removedIndex !== -1) {
                const newFiles = [...prev];
                newFiles.splice(removedIndex, 1);
                return newFiles;
            }
            return prev;
        });
    };

    function SortableImageItem({ id, url, onRemove }: { id: string; url: string; onRemove: () => void }) {
        const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

        const style: React.CSSProperties = {
            transform: CSS.Transform.toString(transform),
            transition,
            width: '160px',
            height: '100px',
            objectFit: 'cover',
            position: 'relative',
            borderRadius: '0.375rem',
            border: '1px solid #dee2e6',
        };

        return (
            <div ref={setNodeRef} style={{ position: 'relative', marginRight: 8 }} {...attributes} {...listeners}>
                <img src={url} style={style} alt="Preview" />
                <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 p-1"
                    onClick={onRemove}
                    aria-label="Remove image"
                >
                    <X size={16} />
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="mb-3">
                <label className="form-label">Upload Images</label>
                <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                    if (active.id !== over?.id) {
                        const oldIndex = previews.findIndex((img) => img.id === active.id);
                        const newIndex = previews.findIndex((img) => img.id === over?.id);
                        const newPreviews = arrayMove(previews, oldIndex, newIndex);
                        setPreviews(newPreviews);
                    }
                }}
            >
                <SortableContext
                    items={previews.map((img) => img.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="d-flex flex-wrap gap-2">
                        {previews.map((preview) => (
                            <SortableImageItem
                                key={preview.id}
                                id={preview.id}
                                url={preview.url}
                                onRemove={() => handleRemoveImage(preview.id)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <div className="mb-3 mt-3">
                <label className="form-label">Video URL</label>
                <input
                    type="url"
                    className="form-control"
                    value={car.videoUrl || ''}
                    onChange={(e) => setCar({ ...car, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                />
            </div>

            {car.videoUrl && (
                <div className="mb-3">
                    <iframe
                        width="100%"
                        height="200"
                        className="rounded"
                        src={car.videoUrl.replace('watch?v=', 'embed/')}
                        allowFullScreen
                        title="Car video"
                    />
                </div>
            )}
        </>
    );
}

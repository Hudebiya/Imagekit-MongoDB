import { useState } from 'react';
import img1 from '../assets/img-1.jpg';
import img2 from '../assets/img-2.jpg';
import img3 from '../assets/img-3.jpg';
import img4 from '../assets/img-4.jpg';
import img5 from '../assets/img-5.jpg';

const PRESET_IMAGES = [img1, img2, img3, img4, img5];

export default function Dashboard({ user, onLogout }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Welcome Note',
      content: 'This is your first note. Edit or delete it!',
      image: PRESET_IMAGES[0],
    },
  ]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      setNotes(notes.map((n) =>
        n.id === editingId ? { ...n, title, content, image } : n
      ));
      setEditingId(null);
    } else {
      const newNote = { id: Date.now(), title, content, image };
      setNotes([newNote, ...notes]);
    }

    setTitle('');
    setContent('');
    setImage('');
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setImage(note.image || '');
    setEditingId(note.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this note?')) {
      setNotes(notes.filter((n) => n.id !== id));
      if (editingId === id) handleCancelEdit();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImage('');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('${PRESET_IMAGES[1]}')`,
      }}
    >
      <div
        className={`min-h-screen backdrop-blur-sm transition-colors duration-300 ${
          isDarkMode
            ? 'bg-stone-950/85 text-stone-100'
            : 'bg-stone-700/80 text-stone-900'
        }`}
      >
        {/* Header */}
        <header
          className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${
            isDarkMode ? 'border-stone-800' : 'border-stone-300'
          }`}
        >
          <div>
            <h1 className="text-xl font-bold text-amber-500">AuraNotes</h1>
            <p className={`text-sm ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
              Welcome, {user?.email || 'Guest'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
              }`}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>

            <button
              onClick={onLogout}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                  : 'bg-stone-200 hover:bg-stone-300 text-stone-800'
              }`}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6">
          {/* LEFT SIDE - Add/Edit Form */}
          <div className="lg:w-1/3 w-full">
            <form
              onSubmit={handleSubmit}
              className={`rounded-xl p-5 lg:sticky lg:top-6 border transition-colors duration-300 ${
                isDarkMode
                  ? 'bg-stone-900/90 border-stone-700'
                  : 'bg-white/90 border-stone-300'
              }`}
            >
              <h2 className="text-lg font-semibold text-amber-500 mb-4">
                {editingId ? 'Edit Note' : 'Add New Note'}
              </h2>
              <input
                type="text"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2 mb-3 text-sm outline-none focus:border-amber-500 transition-colors ${
                  isDarkMode
                    ? 'bg-stone-800 border-stone-600 text-stone-100'
                    : 'bg-stone-100 border-stone-300 text-stone-900'
                }`}
              />
              <textarea
                placeholder="Write your note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className={`w-full border rounded-lg px-4 py-2 mb-3 text-sm outline-none focus:border-amber-500 resize-none transition-colors ${
                  isDarkMode
                    ? 'bg-stone-800 border-stone-600 text-stone-100'
                    : 'bg-stone-100 border-stone-300 text-stone-900'
                }`}
              />

              {/* Image Picker */}
              <p className={`text-xs mb-2 ${isDarkMode ? 'text-stone-400' : 'text-stone-600'}`}>
                Choose an image (optional):
              </p>
              <div className="flex gap-2 mb-4 flex-wrap">
                {PRESET_IMAGES.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setImage(img === image ? '' : img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                      image === img
                        ? 'border-amber-500'
                        : isDarkMode
                        ? 'border-stone-600'
                        : 'border-stone-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
                >
                  {editingId ? 'Update' : 'Add Note'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className={`px-5 py-2 rounded-lg text-sm transition-colors ${
                      isDarkMode
                        ? 'bg-stone-700 hover:bg-stone-600 text-stone-200'
                        : 'bg-stone-300 hover:bg-stone-400 text-stone-800'
                    }`}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT SIDE - Notes Grid */}
          <div className="lg:w-2/3 w-full">
            {notes.length === 0 ? (
              <p className={`text-center mt-12 ${isDarkMode ? 'text-stone-500' : 'text-stone-500'}`}>
                No notes yet — add your first one!
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className={`${note.id === editingId ? 'hidden' : ''} rounded-xl overflow-hidden shadow-sm border transition-colors duration-300 hover:border-amber-600/50 ${
                      isDarkMode
                        ? 'bg-stone-900/90 border-stone-700'
                        : 'bg-white/90 border-stone-300'
                    }`}
                  >
                    {note.image && (
                      <img
                        src={note.image}
                        alt={note.title}
                        className="w-full h-40 object-cover"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-amber-500 mb-2 break-words">
                        {note.title}
                      </h3>
                      <p className={`text-sm mb-4 break-words whitespace-pre-wrap ${
                        isDarkMode ? 'text-stone-300' : 'text-stone-700'
                      }`}>
                        {note.content}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(note)}
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
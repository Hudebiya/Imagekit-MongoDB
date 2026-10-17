
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const API = "http://localhost:4000/posts";

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state?.post;

  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setDesc(post?.desc || "");
    setPreview(post?.image || "");
    setImage(null);
    setError("");
  }, [post]);

  useEffect(() => {
    if (!image) return;

    const imageUrl = URL.createObjectURL(image);
    setPreview(imageUrl);

    return () => URL.revokeObjectURL(imageUrl);
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("desc", desc.trim());

    if (image) {
      data.append("image", image);
    }

    try {
      if (post) {
        setError(
          "Edit feature ke liye backend update route ko PATCH ke mutabiq configure karna abhi baqi hai."
        );
        return;
      }

      if (!image) {
        setError("Please select an image.");
        return;
      }

      await axios.post(API, data);
      navigate("/feed");
    } catch (err) {
      console.error("Post Error:", err);
      setError(
        err.response?.data?.message ||
        "Post upload nahi hui. Backend server check karein."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-xl">
        <button
          type="button"
          onClick={() => navigate("/feed")}
          className="mb-6 text-sm text-slate-400 hover:text-white"
        >
          ← Back to feed
        </button>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h1 className="mb-2 text-3xl font-bold">Create a Post</h1>
          <p className="mb-6 text-sm text-slate-400">
            Select an image and write a description.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium"
              >
                Select Image
              </label>

              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files?.[0] || null)
                }
                required={!post}
                className="block w-full text-sm text-white"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Post preview"
                  className="mt-4 max-h-72 w-full rounded-xl object-contain"
                />
              )}
            </div>

            <div>
              <label
                htmlFor="desc"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-rose-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? "Please wait..." : "Publish Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;






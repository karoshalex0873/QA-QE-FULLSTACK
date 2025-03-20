// BookModal.tsx
import { useState, useEffect } from "react";
import { FaTimes, FaBook, FaUser, FaCalendar, FaBuilding } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: any) => void;
  bookToEdit?: any;
}

const BookModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, bookToEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    pages: "",
    publisher: "",
    description: "",
    image: "",
    pdf: "",
    copies: "1",
  });

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        genre: bookToEdit.genre,
        year: bookToEdit.year.toString(),
        pages: bookToEdit.pages.toString(),
        publisher: bookToEdit.publisher,
        description: bookToEdit.description || "",
        image: bookToEdit.image || "",
        pdf: bookToEdit.pdf || "",
        copies: bookToEdit.copies?.toString() || "1",
      });
    }
  }, [bookToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      year: parseInt(formData.year),
      pages: parseInt(formData.pages),
      copies: parseInt(formData.copies),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl relative">
        <div className="flex justify-between items-center p-6 border-b dark:border-slate-700">
          <div className="flex items-center gap-3">
            <GiBookshelf className="text-2xl text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              {bookToEdit ? "Update Book" : "Add New Book"}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
            <FaTimes className="text-xl text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields */}
            {["title", "author", "genre", "year", "publisher" ,"image", "pages" ,"copies"].map((field) => (
              <div key={field} className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium">
                  {field === "title" && <FaBook className="text-emerald-600" />}
                  {field === "author" && <FaUser className="text-emerald-600" />}
                  {field === "genre" && <GiBookshelf className="text-emerald-600" />}
                  {field === "year" && <FaCalendar className="text-emerald-600" />}
                  {field === "publisher" && <FaBuilding className="text-emerald-600" />}
                  {field === "image" && <FaBuilding className="text-emerald-600" />}
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={["year", "pages", "copies"].includes(field) ? "number" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-emerald-500 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:ring-emerald-500 dark:bg-slate-800 dark:text-white h-32"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            >
              <FaBook className="text-lg" />
              {bookToEdit ? "Update Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
import { useState } from "react";
import { FaTimes, FaBook, FaUser, FaCalendar, FaFilePdf, FaImage, FaCopy, FaBuilding } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: any) => void;
  bookToEdit?: any;
}

const AddBookModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
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
    copies: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className=" absolute top-20 inset-0 bg-black/50 backdrop-blur-sm flex  justify-center z-50 p-4 ">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full h-fit max-w-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b dark:border-slate-700 ">
          <div className="flex items-center gap-3">
            <GiBookshelf className="text-2xl text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add New Book</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <FaBook className="text-emerald-600" /> Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="The Great Gatsby"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <FaUser className="text-emerald-600" /> Author
              </label>
              <input
                type="text"
                name="author"
                placeholder="F. Scott Fitzgerald"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            {/* Genre */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <GiBookshelf className="text-emerald-600" /> Genre
              </label>
              <input
                type="text"
                name="genre"
                placeholder="Classic"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            {/* Publisher */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <FaBuilding className="text-emerald-600" /> Publisher
              </label>
              <input
                type="text"
                name="publisher"
                placeholder="Scribner"
                value={formData.publisher}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            {/* Year */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <FaCalendar className="text-emerald-600" /> Year
              </label>
              <input
                type="number"
                name="year"
                placeholder="1925"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            {/* Pages */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <FaBook className="text-emerald-600" /> Pages
              </label>
              <input
                type="number"
                name="pages"
                placeholder="218"
                value={formData.pages}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            {/* Copies */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <FaCopy className="text-emerald-600" /> Copies
              </label>
              <input
                type="number"
                name="copies"
                placeholder="1"
                value={formData.copies}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <FaImage className="text-emerald-600" /> Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="https://example.com/book-cover.jpg"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* PDF Link */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <FaFilePdf className="text-emerald-600" /> PDF Link
              </label>
              <input
                type="text"
                name="pdf"
                placeholder="https://example.com/book.pdf"
                value={formData.pdf}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">Description</label>
            <textarea
              name="description"
              placeholder="A novel set in the Jazz Age that explores themes of wealth, society, and the American Dream."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-slate-800 dark:text-white h-32"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 transition-colors"
            >
              <FaBook className="text-lg" />
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
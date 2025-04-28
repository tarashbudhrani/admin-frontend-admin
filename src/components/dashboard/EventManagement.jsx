import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

const EventManagement = () => {
  const [showDialog, setShowDialog] = useState(false);

  const [movies, setMovies] = useState([
    {
      name: "Inception",
      genre: "Sci-Fi",
      director: "Christopher Nolan",
      runtime: 148,
      hallNumber: 1,
      screeningDate: "2025-04-22",
      posterImage: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg"
    },
    {
      name: "Interstellar",
      genre: "Adventure",
      director: "Christopher Nolan",
      runtime: 169,
      hallNumber: 2,
      screeningDate: "2025-05-10",
      posterImage: "https://m.media-amazon.com/images/I/71n58nKzPLL._AC_SY679_.jpg"
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    screeningDate: '',
    genre: '',
    director: '',
    posterImage: '',
    runtime: '',
    hallNumber: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const cleanupForm = () => {
    setFormData({
      name: '',
      screeningDate: '',
      genre: '',
      director: '',
      posterImage: '',
      runtime: '',
      hallNumber: ''
    });
    setShowDialog(false);
  };

  const handleSubmit = () => {
    const requiredFields = ['name', 'screeningDate', 'genre', 'runtime', 'hallNumber'];
    const missing = requiredFields.filter(field => !formData[field]);
    if (missing.length > 0) {
      toast({
        title: "Missing Fields",
        description: `Please fill: ${missing.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    const newMovie = {
      ...formData,
      runtime: parseInt(formData.runtime),
      hallNumber: parseInt(formData.hallNumber),
    };

    setMovies([...movies, newMovie]);
    toast({
      title: "Movie Added",
      description: `${formData.name} added successfully.`,
    });

    cleanupForm();
  };

  return (
    <div className="p-6 space-y-6 bg-midnight min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="title-xl text-gold">Movie Manager</h2>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="btn-primary">
              <Plus className="mr-2" size={16} />
              Add New Movie
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-midnight text-cloud">
            <DialogHeader>
              <DialogTitle className="text-gold">Add New Movie</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              {[
                { label: "Title", name: "name", placeholder: "Movie title" },
                { label: "Screening Date", name: "screeningDate", type: "date" },
                { label: "Genre", name: "genre", placeholder: "e.g., Action" },
                { label: "Director", name: "director", placeholder: "e.g., Nolan" },
                { label: "Poster URL", name: "posterImage" },
                { label: "Runtime (minutes)", name: "runtime", type: "number" },
                { label: "Hall Number", name: "hallNumber", type: "number" }
              ].map(({ label, name, placeholder = "", type = "text" }) => (
                <div className="space-y-2" key={name}>
                  <label className="text-sm font-medium text-cloud">{label}</label>
                  <Input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="bg-gray-800 border-gray-700 text-cloud"
                  />
                </div>
              ))}
              <Button onClick={handleSubmit} className="btn-primary w-full mt-4">
                Submit Movie
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Movie Display Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie, index) => (
          <Card key={index} className="bg-gray-800 text-cloud">
            <CardHeader>
              <CardTitle>{movie.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={movie.posterImage} alt={movie.name} className="w-full h-48 object-cover rounded mb-3" />
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Runtime:</strong> {movie.runtime} mins</p>
              <p><strong>Hall:</strong> {movie.hallNumber}</p>
              <p><strong>Screening:</strong> {movie.screeningDate}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventManagement;

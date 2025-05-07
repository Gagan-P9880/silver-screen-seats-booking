
import { useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/movieService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthStatus from "@/components/AuthStatus";

export default function Index() {
  const { data: movies, isLoading, isError } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  const genreList = movies ? [...new Set(movies.flatMap(movie => movie.genre))].sort() : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Cinema Booking</h1>
        <AuthStatus />
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <p>Loading movies...</p>
        </div>
      )}
      
      {isError && (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">Error loading movies. Please try again later.</p>
        </div>
      )}
      
      {movies && movies.length > 0 && (
        <Tabs defaultValue="all">
          <TabsList className="mb-8 flex flex-wrap gap-2">
            <TabsTrigger value="all">All Movies</TabsTrigger>
            {genreList.map((genre) => (
              <TabsTrigger key={genre} value={genre}>
                {genre}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </TabsContent>
          
          {genreList.map((genre) => (
            <TabsContent key={genre} value={genre} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies
                  .filter((movie) => movie.genre.includes(genre))
                  .map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}

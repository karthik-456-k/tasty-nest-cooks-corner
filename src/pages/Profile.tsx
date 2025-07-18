
import { useState } from 'react';
import { Edit, User, BookOpen, Heart, Camera, Lock, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import RecipeCard from '@/components/RecipeCard';

const Profile = () => {
  const { recipes, user, updateUser, toggleFavorite } = useRecipeStore();
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    bio: user.bio,
    avatar: user.avatar,
    email: 'chef@tastynest.com',
    cuisinePreference: 'vegetarian',
    dietaryRestrictions: 'none'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const myRecipes = recipes.filter(recipe => user.myRecipes.includes(recipe.id));
  const favoriteRecipes = recipes.filter(recipe => user.favoriteRecipes.includes(recipe.id));

  const handleSaveProfile = () => {
    updateUser({ 
      name: editData.name, 
      bio: editData.bio, 
      avatar: editData.avatar 
    });
    setEditMode(false);
    toast({
      title: "Profile updated! 🎉",
      description: "Your profile has been successfully updated"
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate password change
    setPasswordMode(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast({
      title: "Password changed! 🔒",
      description: "Your password has been updated successfully"
    });
  };

  const handleLogout = () => {
    // Simulate logout
    setLogoutConfirm(false);
    toast({
      title: "Goodbye! 👋",
      description: "Come back soon for more delicious recipes!"
    });
  };

  const handleFavorite = (recipeId: string) => {
    toggleFavorite(recipeId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-peach-100 to-mint-100 rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-peach-800 mb-2">
            Welcome back, {user.name}! 🍽️
          </h1>
          <p className="text-peach-700">Let's cook something delicious today!</p>
        </div>

        {/* Profile Header */}
        <div className="bg-card rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-peach-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <p className="text-muted-foreground mb-2">{editData.email}</p>
              <p className="text-muted-foreground mb-4 max-w-md">{user.bio}</p>
              
              <div className="flex justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-peach-600">{myRecipes.length}</div>
                  <div className="text-sm text-muted-foreground">My Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-mint-600">{favoriteRecipes.length}</div>
                  <div className="text-sm text-muted-foreground">Favorites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {editData.cuisinePreference === 'vegetarian' ? '🥬' : '🍖'}
                  </div>
                  <div className="text-sm text-muted-foreground">Preference</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {/* Edit Profile Button */}
                <Dialog open={editMode} onOpenChange={setEditMode}>
                  <DialogTrigger asChild>
                    <Button className="bg-peach-500 hover:bg-peach-600 text-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editData.bio}
                          onChange={(e) => setEditData({...editData, bio: e.target.value})}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cuisine">Cuisine Preference</Label>
                        <Select value={editData.cuisinePreference} onValueChange={(value) => setEditData({...editData, cuisinePreference: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetarian">Vegetarian</SelectItem>
                            <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                            <SelectItem value="all">No Preference</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile} className="bg-peach-500 hover:bg-peach-600">
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Change Password Button */}
                <Dialog open={passwordMode} onOpenChange={setPasswordMode}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setPasswordMode(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleChangePassword} className="bg-peach-500 hover:bg-peach-600">
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Logout Button */}
                <Dialog open={logoutConfirm} onOpenChange={setLogoutConfirm}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Confirm Logout</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground mb-6">
                      Are you sure you want to logout? You'll need to sign in again to access your recipes.
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setLogoutConfirm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
                        Logout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="my-recipes" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              My Recipes ({myRecipes.length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Favorites ({favoriteRecipes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-recipes">
            {myRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {myRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    isFavorited={user.favoriteRecipes.includes(recipe.id)}
                    onFavorite={handleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-cream-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start creating your first recipe to share with the community!
                </p>
                <Button className="bg-peach-500 hover:bg-peach-600 text-white">
                  Create Recipe
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            {favoriteRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    {...recipe}
                    isFavorited={true}
                    onFavorite={handleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-cream-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">
                  Browse recipes and save your favorites to see them here!
                </p>
                <Button className="bg-mint-500 hover:bg-mint-600 text-white">
                  Explore Recipes
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;

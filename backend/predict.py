

import os
from PIL import Image, ImageEnhance, ImageOps
import numpy as np
import shutil
from sklearn.model_selection import train_test_split
import albumentations as A
import hashlib
import glob
import random
import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image

#path to the dataset comming from the front end
dataset_dir = "uploads"


def is_image_file(filename):
    # Check if the file has an image extension
    image_extensions = ['.jpg', '.jpeg', '.png']
    return any(filename.lower().endswith(ext) for ext in image_extensions)

def calculate_image_hash(file_path):
    # Calculate the MD5 hash value of the image file
    with open(file_path, 'rb') as f:
        image_data = f.read()
        image_hash = hashlib.md5(image_data).hexdigest()
    return image_hash

def remove_duplicate_images(dataset_dir):
    # Create a dictionary to store the hash values of images
    image_hashes = {}

    # Iterate over the image files in the original dataset directory
    for root, dirs, files in os.walk(dataset_dir):
        for file in files:
            file_path = os.path.join(root, file)

            # Check if the file is an image
            if is_image_file(file_path):
                # Calculate the hash value of the image file
                image_hash = calculate_image_hash(file_path)

                # Check if the hash value already exists in the dictionary
                if image_hash in image_hashes:
                    # Remove the duplicate image file
                    os.remove(file_path)
                    print(f"Removed duplicate image: {file_path}")
                else:
                    # Add the hash value to the dictionary
                    image_hashes[image_hash] = file_path

# Specify the directory containing the images
remove_duplicate_images(dataset_dir)

def check_and_remove_non_image_files(dataset_path):
    allowed_extensions = ['.jpg', '.jpeg', '.png']
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            file_path = os.path.join(root, file)
            file_extension = os.path.splitext(file_path)[1]
            if file_extension.lower() not in allowed_extensions:
                print(f"Non-image file found: {file_path}")
                os.remove(file_path)  # Remove the non-image file

check_and_remove_non_image_files(dataset_dir)

def remove_irrelevant_images(dataset_path, min_image_size):
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with Image.open(file_path) as img:
                    image_width, image_height = img.size
                    if image_width < min_image_size or image_height < min_image_size:
                        print(f"Low-quality image found: {file_path}")
                        os.remove(file_path)  # Remove the low-quality image
            except (IOError, SyntaxError) as e:
                print(f"Invalid image file found: {file_path}")
                os.remove(file_path)  # Remove the invalid image file

min_image_size = 64 # Minimum width or height of valid images
remove_irrelevant_images(dataset_dir, min_image_size)


def convert_images_to_common_format(dataset_path, output_format):
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            file_path = os.path.join(root, file)
            output_path = os.path.splitext(file_path)[0] + "." + output_format.lower()

            if file_path.lower().endswith(('.jpg', '.jpeg', '.png')):
                try:
                    with Image.open(file_path) as img:
                        img.convert("RGB").save(output_path, format=output_format)
                except (IOError, SyntaxError) as e:
                    print(f"Error converting image: {file_path}")

output_format = "png"  # Desired output format, e.g., "jpeg", "png"
convert_images_to_common_format(dataset_dir, output_format)

def remove_files_with_invalid_extension(dataset_path, valid_extension):
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            file_path = os.path.join(root, file)
            file_extension = os.path.splitext(file_path)[1]
            if file_extension.lower() != valid_extension.lower():
                print(f"Invalid file found: {file_path}")
                os.remove(file_path)  # Remove the invalid file

valid_extension = ".png"  # Valid file extension, e.g., ".png"
remove_files_with_invalid_extension(dataset_dir, valid_extension)



def resize_images(dataset_path, target_size):
    for root, dirs, files in os.walk(dataset_path):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with Image.open(file_path) as img:
                    resized_img = img.resize(target_size)
                    resized_img.save(file_path)
            except (IOError, SyntaxError) as e:
                print(f"Error resizing image: {file_path}")

target_size = (240, 240)
resize_images(dataset_dir, target_size)

import os
from PIL import Image
import random
from PIL import ImageEnhance
from PIL import ImageOps

def apply_brightness(image, factor):
    enhancer = ImageEnhance.Brightness(image)
    return enhancer.enhance(factor)

def apply_rotation(image, angle):
    return image.rotate(angle)

def apply_flip(image, horizontal=True, vertical=True):
    if horizontal and random.choice([True, False]):
        image = ImageOps.mirror(image)
    if vertical and random.choice([True, False]):
        image = ImageOps.flip(image)
    return image

def add_noise(image, noise_factor=0.1):
    img_array = np.array(image)
    row, col, _ = img_array.shape
    mean = 0.01
    var = 0.0
    sigma = var**0.5
    gauss = np.random.normal(mean, sigma, (row, col, 3))
    noisy = np.clip(img_array + gauss * 255, 0, 255)
    return Image.fromarray(noisy.astype(np.uint8))

# Iterate through each category folder in the dataset
for category_folder in os.listdir(dataset_dir):
    category_path = os.path.join(dataset_dir, category_folder)

    # Ensure it is a directory
    if os.path.isdir(category_path):
        # Iterate through each item in the current category
        for item_name in os.listdir(category_path):
            item_path = os.path.join(category_path, item_name)

            # Check if the item is an image file
            if os.path.isfile(item_path) and is_image_file(item_name):
                # Load the image
                img = Image.open(item_path).convert("RGB")

                # Apply augmentation
                augmented_img = apply_brightness(img, random.uniform(0.1, 2.5))
                augmented_img = apply_rotation(augmented_img, random.uniform(-90, 90))
                augmented_img = apply_flip(augmented_img, horizontal=True, vertical=True)
                augmented_img = add_noise(augmented_img)

                # Save augmented images in the same folder as the original images
                augmented_img.save(os.path.join(category_path, f'aug_{item_name}'))


model = './model/imageclassifier.h5'


class_names = np.array(['Cauliflower', 'berbere', 'blackCabbage', 'bread', 'bulgurWheat',
       'butter', 'cabbage', 'carrot', 'cheese', 'chicken', 'chilliPapper',
       'egg', 'fish', 'flour', 'garlic', 'ginger', 'injera', 'lemon',
       'lentils', 'macaroni', 'meat', 'oil', 'onion', 'pasta', 'peas',
       'pepper', 'potatoes', 'redRoot', 'salad', 'shiro', 'solidLentils',
       'soyaBeans', 'sweetPotatoes', 'tomato', 'turmeric'], dtype='<U13')



# Load the pre-trained model
model = tf.keras.models.load_model(model)

# Create a list to store the predicted labels for each image
predicted_labels = []

# Iterate over the images in the dataset folder
for image_name in os.listdir(dataset_dir):
    image_path = os.path.join(dataset_dir, image_name)

    # Check if the path is a file
    if os.path.isfile(image_path):
        # Load the image
        img = image.load_img(image_path, target_size=(240, 240))
        img_array = image.img_to_array(img)
        # img_array = tf.expand_dims(img_array, 0)  # Add batch dimension
        img_array /= 255.0  # Normalize the image

        # # Perform prediction using the pre-trained model
        # predictions = pretrained_model.predict(img_array)
        # pred = tf.argmax(predictions, axis=1)  # Get the index of the predicted label
        # predicted_label = class_name[pred[0].argmax()]
        pred = model.predict(tf.expand_dims(img_array, axis=0))
        predicted_label = class_names[pred[0].argmax()]
        predicted_labels.append(predicted_label)
        


# Print the predicted labels for each image
for image_name, predicted_label in zip(os.listdir(dataset_dir), predicted_labels):
    print(f"Image: {image_name}, Predicted Label: {predicted_label}")
print(123)




print([predicted_labels])


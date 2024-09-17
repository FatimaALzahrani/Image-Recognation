# YOLOv5 Object Detection

This project demonstrates how to use the YOLOv5 (You Only Look Once version 5) model to perform object detection in images. YOLOv5 is a popular deep learning model designed for fast and accurate object detection.

## Requirements

- Python 3.6 or higher
- PyTorch 1.7 or higher
- YOLOv5 repository

## Installation

1. Install the required libraries:

   ```bash
   pip install torch torchvision

2. Clone the YOLOv5 repository:

   ```bash
   git clone https://github.com/ultralytics/yolov5.git
   cd yolov5
   pip install -r requirements.txt

## Quick Start

The following script loads a pre-trained YOLOv5 model and runs it on an image of Zidane to detect objects.

### Code

```python
import torch
from yolov5 import detect

# Load the YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

# Download an example image (Zidane)
!wget https://ultralytics.com/images/zidane.jpg -O zidane.jpg

# Perform object detection
results = model('zidane.jpg')

# Display the results
results.show()

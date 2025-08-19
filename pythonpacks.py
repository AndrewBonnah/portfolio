# test_installation.py
import sys
print(f"Python version: {sys.version}")

try:
    import pandas as pd
    print(f"✓ pandas {pd.__version__}")
except ImportError:
    print("✗ pandas not installed")

try:
    import numpy as np
    print(f"✓ numpy {np.__version__}")
except ImportError:
    print("✗ numpy not installed")

try:
    import matplotlib.pyplot as plt
    print(f"✓ matplotlib {plt.matplotlib.__version__}")
except ImportError:
    print("✗ matplotlib not installed")

try:
    import seaborn as sns
    print(f"✓ seaborn {sns.__version__}")
except ImportError:
    print("✗ seaborn not installed")

try:
    from sklearn.model_selection import train_test_split
    import sklearn
    print(f"✓ scikit-learn {sklearn.__version__}")
except ImportError:
    print("✗ scikit-learn not installed")

try:
    import tensorflow as tf
    print(f"✓ tensorflow {tf.__version__}")
except ImportError:
    print("✗ tensorflow not installed")

print("\nInstallation verification complete!")
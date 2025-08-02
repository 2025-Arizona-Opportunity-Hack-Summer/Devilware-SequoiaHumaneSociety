# deploy.py
from google.cloud import aiplatform

PROJECT_ID = "mercurial-shine-466123-d7"
REGION = "us-west2"
IMAGE_URI = f"us-west2-docker.pkg.dev/{PROJECT_ID}/my-models-repo/pet-matcher:latest"

aiplatform.init(project=PROJECT_ID, location=REGION)

# All container settings are grouped into this dictionary
container_spec = {
    "image_uri": IMAGE_URI,
    "predict_route": "/predict",
    "health_route": "/",
    "ports": [{"container_port": 8080}],
}

# Upload the model using the modern container spec
model = aiplatform.Model.upload(
    display_name="custom-container-pet-matcher",
    serving_container_spec=container_spec,
)

print("Deploying model... This can take 10-15 minutes.")
endpoint = model.deploy(
    deployed_model_display_name="custom-container-pet-matcher-endpoint",
    machine_type="n1-standard-2",
)

print(f"✅ Deployment complete! Endpoint ID: {endpoint.name}")
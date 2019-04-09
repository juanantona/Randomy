brew install kubernetes-helm
helm init
helm install stable/nginx-ingress --name nginx-ingress --namespace ingress
helm list
helm delete nginx-ingress
helm del --purge nginx-ingress

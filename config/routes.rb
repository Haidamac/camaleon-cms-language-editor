Rails.application.routes.draw do

  scope PluginRoutes.system_info["relative_url_root"] do
    #Admin Panel
    scope :admin, as: 'admin', path: PluginRoutes.system_info['admin_path_name'] do
      namespace 'plugins' do
        namespace 'cama_language_editor' do
          match 'index' => 'admin#index', via: [:get, :post]
          match 'update' => 'admin#update', via: [:post]
        end
      end
    end
  end
end
